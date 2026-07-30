'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const errors = [];

function read(relativePath) {
    const absolutePath = path.join(root, relativePath);
    if (!fs.existsSync(absolutePath)) {
        errors.push(`Nedostaje ${relativePath}`);
        return '';
    }
    return fs.readFileSync(absolutePath, 'utf8');
}

function requireText(source, expected, label) {
    if (!source.includes(expected)) errors.push(`${label} ne sadrži ${expected}`);
}

function validateScript(name, source) {
    try {
        new vm.Script(source, { filename: name });
    } catch (error) {
        errors.push(`${name} ima sintaksnu grešku: ${error.message}`);
    }
}

function validateInlineScripts(name, html) {
    const pattern = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi;
    let match;
    let index = 0;
    while ((match = pattern.exec(html))) {
        const source = match[1].trim();
        if (!source) continue;
        index += 1;
        validateScript(`${name}#inline-${index}`, source);
    }
}

const rootIndex = read('index.html');
const bootstrap = read('engleski/bootstrap.html');
const manifestSource = read('engleski/manifest.json');
const serviceWorker = read('engleski/sw.js');
const runtime = read('engleski/js/runtime-compat.js');

requireText(rootIndex, 'engleski/bootstrap.html', 'Root index');
requireText(bootstrap, 'js/runtime-compat.js', 'Web bootstrap');
requireText(bootstrap, 'index.html', 'Web bootstrap');
requireText(serviceWorker, './bootstrap.html', 'Service worker');
requireText(serviceWorker, './js/runtime-compat.js', 'Service worker');

try {
    const manifest = JSON.parse(manifestSource);
    if (manifest.start_url !== './bootstrap.html') {
        errors.push('manifest.json start_url mora biti ./bootstrap.html');
    }
} catch (error) {
    errors.push(`manifest.json nije ispravan JSON: ${error.message}`);
}

validateScript('engleski/sw.js', serviceWorker);
validateScript('engleski/js/runtime-compat.js', runtime);
validateInlineScripts('index.html', rootIndex);
validateInlineScripts('engleski/bootstrap.html', bootstrap);

if (errors.length) {
    errors.forEach(error => console.error(`ERROR: ${error}`));
    process.exit(1);
}

console.log('TalkTata web bootstrap validacija prošla.');
