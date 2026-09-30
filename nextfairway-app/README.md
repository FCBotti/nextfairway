# NextFairway App – Startpaket für Claude Code

Dieses Paket enthält alles, was Claude Code für den Start braucht.

## Inhalt

- `CLAUDE.md` – Arbeitsanweisung, die Claude Code bei jedem Start automatisch liest
- `docs/SPEC.md` – vollständige Funktionsbeschreibung
- `docs/mockup/` – 14 Mockup-Screens als HTML (im Browser klickbar) und als PNG in `screens/`
- `assets/brand/` – NextFairway-Cover, YouTube-Thumbnail und textfreie Rasenfotos für die App

## So startest du

1. ZIP entpacken, z. B. nach `~/Projekte/nextfairway-app`.
2. Im Ordner ein Git-Repository anlegen: `git init`, dann `git add .` und `git commit -m "Startpaket"`.
3. Claude Code in diesem Ordner öffnen (Terminal: `cd ~/Projekte/nextfairway-app` und `claude`, oder den Ordner in der Claude-Desktop-App wählen).
4. Als erste Nachricht an Claude Code:

> Lies CLAUDE.md und docs/SPEC.md und sieh dir die Screenshots in docs/mockup/screens an. Fasse kurz zusammen, was du verstanden hast, und nenne offene Fragen. Danach starten wir mit Schritt 1 der Umsetzungsreihenfolge.

## Was du vorher brauchst

- Node.js (LTS) und ein Expo-Konto zum Testen auf dem Handy (App „Expo Go")
- Ein Supabase-Projekt in der Region Frankfurt (EU)
- Für Schritt 4: RSS-Feed-URL des Podcasts und einen YouTube-API-Schlüssel
- Für den Store-Upload später: Apple-Developer- und Google-Play-Konto

## Mockup ansehen

`docs/mockup/02-start.html` im Browser öffnen. Die Screens sind untereinander verlinkt und in Teilen klickbar (Filter, Formulare, Bestätigungen).

## Entwicklung

- `npm install` – Pakete installieren
- `npx expo start` – Dev-Server; mit Expo Go auf dem Handy den QR-Code scannen (im Codespace: `npx expo start --tunnel`)
- `npx expo start --web` – schnelle Ansicht im Browser
- `npm run typecheck` und `npm run lint` – vor jedem Commit
