'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];

function fail(message) {
    errors.push(message);
}

function warn(message) {
    warnings.push(message);
}

function exists(relativePath) {
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath)) {
        fail(`Nedostaje obavezna datoteka: ${relativePath}`);
        return false;
    }
    return true;
}

function read(relativePath) {
    const absolutePath = path.join(root, relativePath);
    try {
        return fs.readFileSync(absolutePath, 'utf8');
    } catch (error) {
        fail(`Ne mogu pročitati ${relativePath}: ${error.message}`);
        return '';
    }
}

function parseJson(relativePath) {
    const source = read(relativePath);
    if (!source) return null;
    try {
        return JSON.parse(source);
    } catch (error) {
        fail(`Neispravan JSON u ${relativePath}: ${error.message}`);
        return null;
    }
}

function validateJavaScript(relativePath) {
    if (!exists(relativePath)) return;
    const source = read(relativePath);
    try {
        new vm.Script(source, { filename: relativePath });
    } catch (error) {
        fail(`JavaScript sintaksna greška u ${relativePath}: ${error.message}`);
    }
}

function validateHtmlReferences(relativePath) {
    if (!exists(relativePath)) return;
    const source = read(relativePath);
    const directory = path.dirname(relativePath);
    const attributePattern = /<(?:script|link)\b[^>]*(?:src|href)=["']([^"'#?]+)["'][^>]*>/gi;
    let match;
    while ((match = attributePattern.exec(source))) {
        const reference = match[1];
        if (/^(?:https?:|data:|mailto:|#)/i.test(reference)) continue;
        const resolved = path.normalize(path.join(directory, reference));
        if (!fs.existsSync(path.join(root, resolved))) {
            fail(`${relativePath} referencira nepostojeću datoteku: ${reference}`);
        }
    }
}

const requiredFiles = [
    'package.json',
    'electron/main.js',
    'electron/preload.js',
    'engleski/index.html',
    'engleski/js/data.js',
    'engleski/js/app.js',
    'engleski/js/runtime-compat.js',
    'engleski/css/style.css',
    'engleski/manifest.json',
    'build/icon.svg',
];
requiredFiles.forEach(exists);

const pkg = parseJson('package.json');
const versionFile = parseJson('engleski/version.json');
parseJson('engleski/manifest.json');

if (pkg) {
    if (pkg.main !== 'electron/main.js') fail('package.json main mora biti electron/main.js.');
    if (!pkg.version || !/^\d+\.\d+\.\d+(?:[-+].+)?$/.test(pkg.version)) {
        fail(`Neispravna semantička verzija u package.json: ${pkg.version || '(prazno)'}`);
    }

    const iconPath = pkg.build?.win?.icon;
    if (!iconPath) fail('Installer nema definiranu Windows ikonu (build.win.icon).');
    else exists(iconPath);

    const packagedPatterns = pkg.build?.files || [];
    if (!packagedPatterns.some(pattern => String(pattern).startsWith('electron/'))) {
        fail('electron/** nije uključen u installer.');
    }
    if (!packagedPatterns.some(pattern => String(pattern).startsWith('engleski/'))) {
        fail('engleski/** nije uključen u installer.');
    }

    if (versionFile?.version && versionFile.version !== pkg.version) {
        fail(`Version mismatch: package.json=${pkg.version}, engleski/version.json=${versionFile.version}`);
    }
}

const mainSource = read('electron/main.js');
if (mainSource && !mainSource.includes('runtime-compat.js')) {
    fail('Electron main process ne injektira runtime-compat.js.');
}
if (mainSource && !mainSource.includes('setPermissionRequestHandler')) {
    fail('Electron main process nema eksplicitni media permission handler.');
}

validateHtmlReferences('engleski/index.html');
[
    'electron/main.js',
    'electron/preload.js',
    'engleski/js/data.js',
    'engleski/js/app.js',
    'engleski/js/runtime-compat.js',
].forEach(validateJavaScript);

const appSource = read('engleski/js/app.js');
const appVersionMatch = appSource.match(/const\s+APP_VERSION\s*=\s*['"]([^'"]+)['"]/);
if (pkg && appVersionMatch && appVersionMatch[1] !== pkg.version) {
    warn(`app.js još prikazuje v${appVersionMatch[1]}, dok je installer v${pkg.version}; Electron runtime koristi stvarnu package verziju.`);
}

warnings.forEach(message => console.warn(`WARN: ${message}`));
if (errors.length > 0) {
    errors.forEach(message => console.error(`ERROR: ${message}`));
    console.error(`\nValidacija nije prošla (${errors.length} grešaka).`);
    process.exit(1);
}

console.log(`TalkTata validacija prošla. Provjereno ${requiredFiles.length} obaveznih datoteka.`);
