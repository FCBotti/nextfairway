# NextFairway App – Anweisungen für Claude Code

Dieses Repository wird die NextFairway App: die Community-App zum Golf-Podcast NextFairway (iOS und Android).
Die vollständige Funktionsbeschreibung steht in `docs/SPEC.md`. Lies sie vor jeder größeren Aufgabe.

## Projektstruktur (Soll)

- `app/` – Screens mit Expo Router, Tabs: Start, Mediathek, Community, Profil
- `src/theme/` – Design-Tokens, Schriften, Komponenten-Stile
- `src/components/` – wiederverwendbare Bausteine (Wortmarke, Karten, Buttons, Avatar, Sterne)
- `src/lib/` – Supabase-Client, Datenzugriff, Hilfsfunktionen (Datum, Zahlen de-DE)
- `supabase/migrations/` – Tabellen, Trigger, RLS als SQL-Migrationen
- `supabase/functions/` – Edge Functions (RSS-Sync, YouTube-Sync, Screenshot, E-Mail)
- `assets/brand/` – Marken-Assets (liegen bereits vor)
- `docs/` – SPEC.md und Mockup (nur Referenz, nicht ausliefern)

## Mockup als Referenz

- `docs/mockup/screens/*.png` zeigt jeden Screen, `docs/mockup/*.html` enthält Aufbau, Abstände und Farben als Inline-Styles.
- Die HTML-Dateien sind keine Vorlage für Code. Übernimm Layout, Hierarchie, Texte und Farben, baue die Screens aber als React-Native-Komponenten.
- Werte in eckigen Klammern wie [Golfclub-Name] sind Platzhalter. Ersetze sie durch echte Daten oder leere Zustände.
- Dateinamen-Zuordnung: 01-anmeldung, 02-start, 03-episode, 04-mediathek, 05-community, 06-diskussion, 07-mitgliedsprofil, 08-mein-profil, 09-golfplaetze, 10-golfplatz-detail, 11-duell-bilanz, 12-postfach, 13/14 = Admin (Phase 2, nicht jetzt bauen).

## Design-Regeln (NextFairway-CI)

- Farben nur aus `src/theme`: ink #111111, white #FFFFFF, accent #5E17EB, grassTint #EEF3DC, surface #F5F5F2, border #E4E4E0, textMuted #5C5C5C; funktional badge #C62828, danger #B42318, star #D9A62B.
- Wortmarke NEXT (schwarz) über FAIRWAY (weiß) mit Claim „Der Golf-Podcast", nur auf `assets/brand/hero-quer.jpg` bzw. `hero-hoch.jpg`, nie auf Flachfarbe, nie umgefärbt.
- Schriften: Archivo Black (Überschriften, Wortmarke), Barlow (Text), Barlow Condensed Light (Claim). Dateien in `docs/mockup/fonts/`.
- Violett nur für Hauptbuttons, Zitat-Sprechblasen, Namens-Kapseln und Akzente. Ein violetter Hauptbutton pro Screen.
- Mindest-Tippfläche 44 × 44 px, gute Kontraste, Screenreader-Labels für Icon-Buttons.

## Arbeitsweise

- Arbeite die Schritte aus „Umsetzungsreihenfolge" in `docs/SPEC.md` nacheinander ab. Nach jedem Schritt: App starten, kurz prüfen, committen.
- Frag nach, bevor du von der SPEC abweichst oder eine der „Offenen Entscheidungen" selbst triffst.
- UI-Texte auf Deutsch mit Du-Ansprache, Zahlen im deutschen Format (4,3), Zeitzone Europe/Berlin.
- Jeder Screen hat Lade-, Leer- und Fehlerzustand.
- Geheimnisse (API-Schlüssel) nur in Edge Functions bzw. Umgebungsvariablen, nie im App-Code oder im Repo.
- Jede Tabelle bekommt RLS-Regeln. Turniere und Duelle nur für bestätigte Freunde lesbar.
- Phase 1 enthält keine Push-Benachrichtigungen, keinen Profilfoto-Upload und keine Admin-Oberfläche.
