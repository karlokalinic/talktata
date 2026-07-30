# TalkTata — build, installer i ažuriranja

TalkTata ima dva načina rada:

- statična web-aplikacija iz mape `engleski/`
- Windows desktop aplikacija pakirana kroz Electron i NSIS

Mikrofon, prepoznavanje govora, glasovno čitanje i zvučni efekti dodatne su mogućnosti. Nijedna od njih nije potrebna za prolazak lekcija.

## Zahtjevi

- Windows 10 ili noviji za testiranje instalera
- Node.js 20 ili noviji
- Git

Provjera verzije Nodea:

```powershell
node --version
npm --version
```

## Lokalna provjera izvornog koda

Iz korijena repozitorija:

```powershell
npm install
npm run check
```

`npm run check` provjerava:

- postoje li sve datoteke potrebne aplikaciji i installeru
- jesu li JSON i JavaScript datoteke sintaktički ispravne
- podudaraju li se verzije
- postoje li lokalni resursi koje HTML učitava
- uključuje li paket Electron runtime, web-aplikaciju, compatibility layer i ikonu

## Pokretanje desktop aplikacije u development načinu

```powershell
npm start
```

Development način ne pokušava instalirati automatska ažuriranja. Greške renderera ispisuju se u terminal.

## Izrada Windows instalera

```powershell
npm run build:installer
```

Rezultat se nalazi u mapi `dist/`, primjerice:

```text
dist/TalkTata-1.1.0-x64.exe
```

Installer koristi asistirani NSIS tok: korisnik može odabrati lokaciju, stvara se Start Menu prečac i, prema izboru instalacije, desktop prečac. Deinstalacija namjerno ne briše spremljeni napredak.

## Portable build

```powershell
npm run build:portable
```

Portable izdanje služi za ručno testiranje. Ne treba ga koristiti kao glavni kanal za automatska ažuriranja.

## GitHub Actions build

Workflow `.github/workflows/windows-build.yml` automatski:

1. instalira ovisnosti na čistom Windows runneru
2. pokreće `npm run check`
3. gradi NSIS `.exe`
4. sprema installer kao GitHub Actions artifact na 14 dana

Build se pokreće na pull requestu, na promjenama grana `main` i `fix/**`, ručno te na tagovima `v*`.

## Objavljivanje nove verzije

Prije objave promijeni verziju u:

- `package.json`
- `engleski/version.json`

Zatim provjeri i commitaj promjene:

```powershell
npm install
npm run check
git add .
git commit -m "Release TalkTata v1.2.0"
git push
```

Za službeni GitHub Release napravi i pošalji tag:

```powershell
git tag v1.2.0
git push origin v1.2.0
```

Tag workflow koristi ugrađeni `GITHUB_TOKEN`, gradi installer i objavljuje update datoteke. Lokalni osobni pristupni token nije potreban za standardni CI release.

## Ponašanje bez mikrofona ili zvuka

- bez mikrofona: izgovor se vježba ručnom samoprocjenom
- odbijena dozvola: aplikacija prelazi na isti ručni način, bez beskonačnog retry loopa
- bez TTS glasa: prikazuje se tekst fraze
- bez AudioContexta ili audio izlaza: zvučni efekti se preskaču
- bez interneta: lekcije i lokalno spremanje nastavljaju raditi; samo provjera ažuriranja i mrežno prepoznavanje govora mogu biti nedostupni

Na dnu aplikacije pojavljuje se kratka obavijest o aktivnom prilagođenom načinu i gumb za ponovnu provjeru uređaja.

## Dijagnostika

Ako desktop aplikacija ne otvori sučelje, Electron prikazuje jasnu poruku o nedostajućoj ili oštećenoj datoteci. Ako renderer prestane raditi, korisnik može ponovno učitati sučelje bez namjernog brisanja spremljenog napretka.

Za lokalni debug pokreni:

```powershell
npm start
```

Zatim kopiraj cijeli terminalski izlaz, ne samo posljednju liniju.
