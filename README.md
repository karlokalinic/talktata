# TalkTata

Interaktivni tečaj engleskog jezika za hrvatske početnike, dostupan kao statična web-aplikacija i Windows desktop aplikacija.

## Ključno ponašanje

TalkTata je local-first i mora ostati prohodan bez posebnog hardvera:

- mikrofon nije obavezan
- odbijena dozvola za mikrofon ne blokira lekciju
- bez mikrofona koristi se ručna samoprocjena izgovora
- bez dostupnog TTS glasa fraza se prikazuje tekstualno
- bez audio izlaza ili Web Audio podrške preskaču se zvučni efekti
- bez interneta nastavljaju raditi lekcije i lokalno spremanje napretka

## Struktura projekta

- `engleski/` — web-aplikacija i sadržaj tečaja
- `engleski/index.html` — glavni renderer
- `engleski/css/style.css` — izgled i responsive pravila
- `engleski/js/data.js` — lekcije, fraze i postignuća
- `engleski/js/app.js` — postojeća aplikacijska logika
- `engleski/js/runtime-compat.js` — fallbackovi za mikrofon, TTS, audio i runtime greške
- `electron/main.js` — desktop prozor, dozvole, navigacija i updater
- `electron/preload.js` — ograničeni sigurni IPC bridge
- `build/icon.svg` — master ikona za Windows installer
- `scripts/validate-build.js` — statička provjera prije pokretanja/builda
- `.github/workflows/windows-build.yml` — čisti Windows CI build instalera

## Lokalno pokretanje web-verzije

Iz korijena repozitorija:

```powershell
python -m http.server 8000
```

Zatim otvori `http://localhost:8000/engleski/`.

## Desktop development

Zahtijeva Node.js 20 ili noviji.

```powershell
npm install
npm start
```

`npm start` prvo pokreće validaciju, zatim Electron.

## Provjera projekta

```powershell
npm run check
```

Provjeravaju se sintaksa, verzije, lokalni HTML resursi, installer inputi i obavezne runtime datoteke.

## Windows installer

```powershell
npm run build:installer
```

Izlaz se nalazi u `dist/`. Installer je asistirani NSIS paket s hrvatskim instalacijskim tokom i izborom lokacije.

Detalji za build i release nalaze se u `BUILD_INSTRUCTIONS.md`.

## Automatski build

Svaki pull request i push na `main` ili `fix/**` granu pokreće GitHub Actions Windows build. Uspješan workflow sprema stvarni `.exe` kao artifact. Tag oblika `v1.2.0` pokreće release build.

## Deployment web-verzije

Repozitorij ostaje kompatibilan sa statičnim hostingom. `engleski/js/data.js` mora se učitati prije `engleski/js/app.js`.
