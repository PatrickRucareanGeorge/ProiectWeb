# Portofoliu Web — Patrick Rucarean George

Acesta este un portofoliu web dinamic care afișează proiectele din contul GitHub al lui Patrick Rucarean George. Pagina rulează HTML/CSS/JavaScript în frontend și include un backend simplu Node.js/Express pentru a proteja un GitHub Personal Access Token (PAT) și a evita limitele de request.

## Ce include proiectul

- `index.html` — pagină web personală cu secțiuni de profil, despre mine, experiență, educație și portofoliu.
- `styles.css` — stiluri responsive și moderne pentru un aspect clar.
- `caca.js` — JavaScript frontend care preia proiectele din GitHub, filtrează și sortează rezultatele.
- `server.js` — mini-server proxy Node.js/Express pentru a folosi un token GitHub în siguranță.
- `package.json` — configurare Node.js și dependențe.
- `.env.example` — model pentru tokenul GitHub.

## Funcționalități implementate

- integrare GitHub API prin `fetch`
- afișare carduri de proiect
- filtrare live după text
- sortare după data actualizării și stele
- încărcare progresivă cu buton `Încarcă mai multe`
- stare de loading și tratări de eroare
- excludere fork-uri (`fork === false`)
- fallback hardcodate dacă API-ul nu este disponibil
- backend proxy pentru GitHub PAT

## Instalare locală

1. Deschide terminalul în directorul proiectului:
   ```bash
   cd "g:\Bogdan WEB"
   ```
2. Instalează dependențele:
   ```bash
   npm install
   ```
3. Creează fișierul `.env` pornind de la `.env.example`
   ```bash
   copy .env.example .env
   ```
4. Adaugă tokenul GitHub în `.env`:
   ```text
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   GITHUB_USERNAME=PatrickRucareanGeorge
   ```
5. Pornește serverul:
   ```bash
   npm start
   ```
6. Deschide în browser:
   ```text
   http://localhost:3000
   ```

## Observații

- Dacă serverul proxy nu este pornit, frontend-ul va încerca direct API-ul GitHub.
- Token-ul nu este niciodată inclus în codul frontend.
- Serverul este util pentru a evita limita implicită GitHub de 60 request-uri pe oră.

## Descriere bonus

- implementare backend proxy pe Node.js
- implementare paginare/incrementare `Load More`
- documentație clară pentru instalare și deploy

## Posibil deploy

Poți deploya proiectul pe:

- Vercel (folosind serverless sau folderul proiectului)
- Netlify (backend-ul poate fi făcut ca funcție serverless)
- Heroku / Render / Railway

> Dacă vrei, pot adăuga și un fișier `README.md` mai detaliat cu descrierea arhitecturii și pași pentru deploy pe Vercel sau GitHub Pages.
