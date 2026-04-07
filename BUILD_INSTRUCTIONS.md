# 🛠️ TalkTata — Build & Auto-Update Upute

## A) PRVI PUT: Setup + prvi build

### Zahtjevi (instaliraj jednom)

1. **Node.js** — preuzmi s https://nodejs.org (LTS verzija, 64-bit)
   - Na instalaciji: klikni "Next" na sve, potvrdi "Add to PATH"
   - Provjeri: otvori Command Prompt → `node --version`

2. **GitHub account** — napravi na https://github.com
   - Kreiraj **Personal Access Token** (PAT) za publishanje:
     1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
     2. "Generate new token (classic)"
     3. Ime: `talktata-publish`
     4. Scope: označi **`repo`** (cijeli checkbox)
     5. "Generate token" → **KOPIRAJ TOKEN** (vidjet ćeš ga samo jednom!)

3. **Kreiraj GitHub repo**:
   1. https://github.com/new → ime: `talktata`, Public, Create
   2. Otvori PowerShell u `karlolegend/engleski/`:
   ```powershell
   cd c:\Users\kalinika\Documents\karlolegend\engleski
   git init
   git add .
   git commit -m "TalkTata v1.0.0"
   git remote add origin https://github.com/TVOJ_USERNAME/talktata.git
   git branch -M main
   git push -u origin main
   ```

4. **Uredi package.json** — zamijeni `TVOJ_GITHUB_USERNAME` svojim username-om:
   ```json
   "publish": {
     "provider": "github",
     "owner": "TVOJ_GITHUB_USERNAME",
     "repo": "talktata"
   }
   ```

---

### Korak 1: Konvertiraj ikonu u PNG (jednom)

electron-builder zahtijeva PNG ikonu (min 256×256).

- Otvori `engleski\icons\logo.svg` u Chrome → screenshot (Win+Shift+S)
- Paint → Paste → Resize 256×256 → Save As → `engleski\icons\icon-256.png`

Ili iz terminala: `magick engleski\icons\logo.svg -resize 256x256 engleski\icons\icon-256.png`

---

### Korak 2: Install + Build + Publish

```powershell
cd c:\Users\kalinika\Documents\karlolegend\engleski
npm install
$env:GH_TOKEN = "TVOJ_GITHUB_PAT_TOKEN_OVDJE"
npm run publish
```

Ovo radi:
- Pakira aplikaciju u Electron
- Kreira NSIS installer (.exe)
- **Upload-a .exe + latest.yml na GitHub Releases automatski!**

Output: `dist/TalkTata Setup 1.0.0.exe`

---

### Korak 3: Pošalji tati PRVI .exe

1. Pronađi: `dist/TalkTata Setup 1.0.0.exe` (~80-100 MB)
2. Pošalji tati preko Google Drive / WeTransfer / OneDrive
3. Tata instalira (dvaput klik → "More info" → "Run anyway")
4. Gotovo! Od sada **auto-update radi automatski**.

---

## B) SLANJE UPDATEA (svaki put nakon promjena)

Kad napraviš promjene u kodu, tata ih dobije automatski. Evo koraka:

### 1. Bump verziju (obavezno!)

Uredi **3 mjesta**:

```
engleski/package.json       →  "version": "1.1.0"
engleski/engleski/js/app.js →  const APP_VERSION = '1.1.0';
```

Verzioniranje: `1.0.0` → `1.1.0` (novi feature) ili `1.0.1` (bugfix)

### 2. Publish

```powershell
cd c:\Users\kalinika\Documents\karlolegend\engleski
$env:GH_TOKEN = "TVOJ_GITHUB_PAT_TOKEN_OVDJE"
npm run publish
```

### 3. To je sve!

Kad tata sljedeći put otvori TalkTata:
1. Aplikacija tiho provjerava GitHub Releases u pozadini
2. Ako postoji nova verzija → automatski se download-a
3. Pojavi se dialog: "✅ Ažuriranje spremno! Instaliraj sada"
4. Tata klikne "Instaliraj" → app se restarta s novom verzijom
5. **Tata ne mora ništa skinuti ručno** — sve automatski

---

## C) KAKO TO RADI (tehničko objašnjenje)

```
TI (developer)                    GITHUB                    TATA (korisnik)
═══════════════                   ══════                    ═══════════════
npm run publish ──────────────→ GitHub Releases            
                                  (upload .exe +            
                                   latest.yml)              
                                       │                    
                                       │←──── checkForUpdates()
                                       │                    (svaki put kad otvori app)
                                       │                    
                                       │────→ download u pozadini
                                       │                    
                                       │────→ "Instaliraj sada" dialog
                                       │                    
                                       └────→ quitAndInstall()
                                              (restarta app s novom verzijom)
```

**electron-updater** koristi `latest.yml` datoteku na GitHub Releases da provjeri
ima li nova verzija. Ako ima, download-a novi installer u temp folder i zamijeni
staru verziju kad korisnik klikne "Instaliraj".

---

## FAQ

**Q: Windows Defender / SmartScreen blokira?**
A: Normalno za unsigned .exe. "More info" → "Run anyway". Za potpuno čistu instalaciju
treba code signing certificate ($200-400/god) — za osobni projekt nepotrebno.

**Q: Tata nema internet, hoće li app raditi?**
A: Da! App radi 100% offline. Update check tiho fail-a i pokušava opet sljedeći put.

**Q: Mogu li vidjeti što je objavljeno?**
A: Da → `https://github.com/TVOJ_USERNAME/talktata/releases`

**Q: Kako ručno poslati .exe bez auto-update?**
A: `npm run build` (umjesto `publish`) → pošalji `dist/TalkTata Setup X.X.X.exe` ručno.

**Q: Aplikacija je prespora?**
A: Electron šalje Chromium. Minimum 4 GB RAM-a i Windows 10+.
