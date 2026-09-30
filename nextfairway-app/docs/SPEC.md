# NextFairway App – Funktionsbeschreibung

Stand: 30.09.2026 · Autor: Thomas Ottersbach

## Überblick

Die NextFairway App ist die Community-App zum Golf-Podcast NextFairway für iOS und Android: Folgen als Video schauen, sich über Golfplätze, Training und Fitness austauschen, Turniere und Duelle mit Freunden verfolgen. Zielgruppe sind deutschsprachige Hobby- und Amateurgolfer im DACH-Raum. Sprache der App ist Deutsch, Ansprache per Du.

Das visuelle Referenz-Mockup liegt in `docs/mockup/`: pro Screen eine HTML-Datei (im Browser zu öffnen, klickbar) und ein Screenshot in `docs/mockup/screens/`. Alle Werte in eckigen Klammern im Mockup, etwa [Golfclub-Name] oder [Anzahl], sind Platzhalter und keine echten Daten.

| Phase | Umfang | Bewusst nicht enthalten |
| --- | --- | --- |
| 1 – App-Start | Nutzerkonto, Profil mit Avatar, Mediathek, Forum, Direktnachrichten, Freunde, Turniere, Golfplätze mit Bewertung und Fotos, Duell-Bilanz, Postfach, Newsletter-Einwilligung | Admin-Oberfläche, Push, eigenes Profilfoto, Newsletter-Anbindung |
| 2 – Verwaltung | Admin-Login, Web-Verwaltung für Golfplätze, Forum-Moderation, Newsletter-Seite mit CSV-Export | Push, Profilfoto-Upload |
| 3 – Ausbau | Push-Benachrichtigungen, eigenes Profilfoto, Newsletter-Schnittstelle (Mailchimp oder Brevo), Admin legt Plätze selbst an | – |

Die Nutzer-Anmeldung gehört in Phase 1, weil Profile, Forum, Freunde und Duelle ohne Konto nicht funktionieren. In Phase 2 kommt nur der Admin-Zugang mit Verwaltung dazu. Bis dahin pflegt der Admin Daten direkt im Supabase-Dashboard.

## Tech-Stack und Architektur

React Native mit Expo und TypeScript für die App, Supabase als Backend in der EU-Region Frankfurt. iOS und Android entstehen aus einer Codebasis, die Admin-Verwaltung in Phase 2 nutzt dieselbe Datenbank.

| Baustein | Lösung | Hinweis |
| --- | --- | --- |
| App | React Native, Expo, Expo Router, TypeScript | Tab-Navigation mit 4 Tabs |
| Datenbank und Rechte | Supabase Postgres mit Row Level Security | Jede Tabelle mit RLS-Regeln |
| Anmeldung | Supabase Auth: E-Mail und Passwort, Sign in with Apple, Google | Apple-Login ist Pflicht, sobald Google-Login angeboten wird |
| Dateien | Supabase Storage | Platzfotos, Website-Screenshots, später Profilfotos |
| Podcast-Folgen | RSS-Feed, stündlich per Edge Function eingelesen | Titel, Shownotes, Datum, Dauer, Gast |
| Videos | YouTube Data API v3, stündlicher Abgleich per Edge Function | Wiedergabe im eingebetteten YouTube-Player |
| Website-Screenshot | Screenshot-Dienst (z. B. ScreenshotOne oder Urlbox) über Edge Function | Nur als Ersatz, wenn ein Platz kein Foto hat |
| E-Mails | Transaktionsmail-Anbieter (z. B. Resend oder Brevo) | Registrierung, Passwort, Newsletter-Bestätigung |
| Admin-Verwaltung (Phase 2) | Web-App, z. B. Next.js, auf derselben Supabase | Zugriff nur mit Admin-Rolle |

Video läuft bewusst über YouTube: Spotify erlaubt Drittanbieter-Apps nach aktuellem Stand keine eigene Video-Wiedergabe. Die Podcast-Folgen kommen per RSS, das passende YouTube-Video wird jeder Folge über das Feld `youtube_video_id` zugeordnet. Zusätzlich gibt es Links „In Spotify öffnen" und „In Apple Podcasts öffnen".

## Design-System nach NextFairway-CI

Schwarz und Weiß als Wortmarken-Paar, Violett #5E17EB als einziger Akzent, Rasengrün nur als Foto. Alle Farben liegen als Design-Tokens in einer zentralen Theme-Datei.

| Token | Wert | Einsatz |
| --- | --- | --- |
| ink | #111111 (Wortmarke #000000) | Text, dunkle Buttons, aktive Tabs |
| white | #FFFFFF | Karten, Text auf Violett, FAIRWAY in der Wortmarke |
| accent | #5E17EB | Hauptbuttons, Zitat-Sprechblasen, Namens-Kapseln, Hervorhebungen |
| grass | #A6BF59 | Nur als Rasenfoto-Hintergrund bzw. Platzhalter beim Laden |
| grassTint | #EEF3DC | Helle Fläche für „Geprüft", Hinweise, Freundschaft |
| surface | #F5F5F2 | App-Hintergrund, Eingabefelder |
| border | #E4E4E0 | Kartenränder, Trennlinien |
| textMuted | #5C5C5C | Sekundärtext |
| badge | #C62828 | Nur die rote Zahl an Glocke und Postfach |
| danger | #B42318 | Ablehnen, Niederlage, Fehler |
| star | #D9A62B | Sterne der Platzbewertung |
| pending | #FFF4D6 / #7A5A12 | „In Prüfung", „wartet auf Bestätigung" |

**Schriften:** Archivo Black für Wortmarke, Überschriften und Abschnittstitel in Versalien. Barlow für Fließtext und Bedienelemente. Barlow Condensed Light für den Claim „Der Golf-Podcast". Die Schriftdateien liegen in `docs/mockup/fonts/` (Open Font License) und können in die App übernommen werden, z. B. mit `expo-font`.

**Wortmarke:** NEXT in Schwarz über FAIRWAY in Weiß, linksbündig gestapelt, darunter der Claim. Sie steht immer auf dem Rasenfoto, nie auf einer Flachfarbe, und wird nie umgefärbt. Einsatz: Kopf der Startseite, Anmelde-Screen, Splash-Screen, App-Icon.

**Bildsprache:** Das Rasenfoto mit Golfhandschuh aus dem Podcast-Cover ist das Erkennungsbild, links Text, rechts Motiv. Folgen-Kacheln folgen dem YouTube-Thumbnail: violette Zitat-Sprechblase oben links, violette Namens-Kapsel des Gastes. Quelldateien in `assets/brand/`: `cover-quadrat.png`, `youtube-thumbnail.png`, dazu die textfreien Zuschnitte `hero-quer.jpg` (Kopf der Startseite) und `hero-hoch.jpg` (Anmeldung).

**Komponenten:** Kartenradius 16 bis 20 px, Buttonradius 12 bis 14 px, Mindest-Tippfläche 44 × 44 px, Abschnittstitel in Versalien, ein Hauptbutton pro Screen in Violett. Tab-Leiste mit Start, Mediathek, Community und Profil, aktiver Tab in Schwarz.

## Screens und Funktionen

Phase 1 umfasst 12 App-Screens, Phase 2 zwei Admin-Screens. In Klammern die Datei in `docs/mockup/`.

**1. Anmeldung** (01-anmeldung)

- Rasenfoto mit Wortmarke, darunter Umschalter Anmelden / Registrieren.
- Anmelden: E-Mail, Passwort, „Passwort vergessen?", Apple, Google.
- Registrieren: Vorname, E-Mail, Passwort, Pflicht-Häkchen für Nutzungsbedingungen und Datenschutz, optionales Newsletter-Häkchen (standardmäßig aus).
- Nach der Registrierung öffnet sich „Mein Profil" als Onboarding: Avatar, Handicap, Heimatclub.

**2. Start** (02-start)

- Kopf: Rasenfoto mit Wortmarke, Suche und Glocke mit roter Zahl (Postfach).
- Neue Folge als große Kachel im Thumbnail-Stil: Zitat-Sprechblase, Gast-Kapsel, Play-Button.
- Turniere deiner Freunde: die nächsten kommenden Turniere bestätigter Freunde, nach Datum, höchstens 5.
- Weitere Folgen (horizontal), Neu auf YouTube, Aus der Community (2 aktive Diskussionen).

**3. Episode** (03-episode)

- YouTube-Player oben, darunter Titel, Datum, Dauer.
- Buttons: Spotify, YouTube, Apple Podcasts als externe Links.
- Shownotes aus dem RSS-Feed, Gast-Karte, verknüpfte Forum-Diskussion zur Folge.

**4. Mediathek** (04-mediathek)

- Alle Folgen und YouTube-Videos in einer Liste, neueste zuerst.
- Filter: Alle, Podcast, Golf-Vlog, Extras. Die Kategorie wird beim Import aus der YouTube-Playlist abgeleitet.

**5. Community / Clubhaus** (05-community)

- Suche, 6 Themenbereiche: Golfplätze, Golftraining, Golf-Fitness, Equipment, Regeln und Handicap, Golfreisen.
- „Golfplätze" öffnet das Platzverzeichnis, die anderen Bereiche die Themenliste.
- Aktuelle Diskussionen, Button „Neuer Beitrag" mit Titel, Text, Themenbereich, optional verknüpfter Folge oder verknüpftem Platz.

**6. Diskussion** (06-diskussion)

- Beitrag mit Autor (Avatar, Name, Handicap), verknüpfter Folge und Antworten.
- Antwortfeld unten. Tipp auf einen Namen öffnet das Mitgliedsprofil.
- Pro Beitrag und Antwort: „Melden". Pro Mitglied: „Blockieren".

**7. Mitgliedsprofil** (07-mitgliedsprofil)

- Avatar, Name, Handicap, Anzahl Beiträge.
- „Als Freund hinzufügen" bzw. Status „Anfrage gesendet" oder „Befreundet".
- „Nachricht senden", nur wenn das Mitglied Nachrichten erlaubt.
- Nur für Freunde sichtbar: Duell-Bilanz-Karte und nächste Turniere.
- Heimatclub-Karte mit Link zur Platzseite, Liste der Beiträge.

**8. Mein Profil** (08-mein-profil)

- Avatar-Auswahl aus 20 illustrierten Golfer-Avataren: 6 Hauttöne, 6 Haarfarben, verschiedene Frisuren, einige mit Golf-Cap. Kein Foto-Upload in Phase 1. Die Avatare sind im Mockup als SVG aufgebaut und können als Vorlage dienen oder von einem Illustrator neu gezeichnet werden.
- Felder: Name, Handicap-Index (eine Nachkommastelle, Komma), Heimatclub.
- Heimatclub wird aus der Platz-Datenbank gewählt. Fehlt der Platz: „Jetzt eintragen".
- Meine nächsten Turniere: Name, Datum, Golfclub; eintragen und löschen.
- Schalter: Nachrichten erlauben, NextFairway-Newsletter (löst Bestätigungsmail aus).
- Meine Beiträge, Abmelden, Konto löschen.

**9. Golfplätze** (09-golfplaetze)

- Suche nach Name oder Ort, Schnellfilter: 18 Loch, 9 Loch, 4+ Sterne, Mit Scorecard, Geprüft.
- Weitere Filter: Region, Greenfee-Spanne, Sortierung nach Bewertung, Anzahl Bewertungen, Entfernung, Greenfee.
- Karte pro Platz: Foto, Status „Geprüft" oder „In Prüfung", Sterne-Schnitt mit Anzahl, Löcher, Par, Länge, Greenfee ab.
- „Platz eintragen": Name, Ort, Region, Löcher, Par, Länge in Metern, Greenfee Wochentag und Wochenende, Links zu Website, Mitgliedschaften und Scorecard, bis zu 5 Fotos.

**10. Golfplatz-Detail** (10-golfplatz-detail)

- Fotogalerie mit „Foto hinzufügen". Ohne Foto: automatischer Screenshot der Club-Website.
- Status, Name, Ort, eingetragen von.
- Eckdaten: Löcher, Par, Länge, Greenfee Woche und Wochenende.
- Buttons: Mitgliedschaften (Hauptbutton), Scorecard, Website. Link „Angaben ergänzen oder korrigieren".
- Bewertung: Schnitt mit einer Nachkommastelle, Sterne, Verteilung 1 bis 5, eigene Bewertung mit optionalem Kommentar, Liste der Bewertungen.

**11. Duell-Bilanz** (11-duell-bilanz)

- Kopf: Du gegen Freund, Stand Siege : Niederlagen, Anzahl Remis, Balken, wer führt.
- Tabelle nach Spielform: Matchplay, Zählspiel, Stableford mit Siegen, Remis, Niederlagen.
- „Runde eintragen": Gegner (nur Freunde), Spielform, Sieger (Ich, Remis, Gegner), Ergebnis optional, Datum, Golfplatz.
- Verlauf aller Runden. Offene Runden zeigen „Liegt im Postfach von …, wartet auf Bestätigung".

**12. Postfach** (12-postfach)

- Erreichbar über die Glocke auf der Startseite. Die rote Zahl zeigt alles Offene und Ungelesene.
- Runden bestätigen: Bestätigen oder Ablehnen pro Runde.
- Neuigkeiten mit Filter Alle, Freunde, Forum, Mein Platz und ungelesen-Punkt; „Alle gelesen".
- Arten: Direktnachricht, Freundschaftsanfrage, Freund schreibt im Forum, Antwort auf eigenen Beitrag, neue Bewertung am Heimatclub, neue Diskussion zum Heimatclub, Freund spielt Turnier am Heimatclub.

**13. Verwaltung Golfplätze** (13-admin-golfplaetze, Phase 2, Web)

- Tabelle aller Plätze mit Filtern Alle, Neu von Nutzern, Geprüft, Ausgeblendet und Suche.
- Detailbereich: Prüfen und freigeben, Bearbeiten, Zusammenführen (Duplikate), Ausblenden.
- Schloss pro Feld: gesperrte Felder ändert nur der Admin.
- Änderungsvorschläge von Nutzern: Übernehmen oder Ablehnen. „Platz selbst anlegen".

**14. Verwaltung Newsletter** (14-admin-newsletter, Phase 2, Web)

- Zahlen: registrierte Nutzer, bestätigte Abonnenten, ausstehende Bestätigungen.
- Anbieterwahl (Mailchimp, Brevo, anderer), Status „Nicht verbunden", Feld-Zuordnung.
- „Abonnenten als CSV exportieren": nur bestätigte Abonnenten.

## Datenmodell

Die Golfplatz-Tabelle `courses` ist die zentrale Quelle für alle Plätze: Heimatclub, Turnierort, Duell-Ort und Forum-Verknüpfung verweisen darauf, statt Namen als Freitext zu speichern. Alle IDs sind UUIDs, alle Zeitstempel `timestamptz`.

| Tabelle | Wichtigste Felder | Hinweise |
| --- | --- | --- |
| `profiles` | id (= auth.users), first_name, avatar_id (1–20), avatar_url, handicap_index numeric(3,1), home_course_id, allow_messages, newsletter_status (none, pending, confirmed, unsubscribed), newsletter_consent_at, newsletter_consent_source, role (user, admin) | avatar_url bleibt in Phase 1 leer und hat später Vorrang vor avatar_id |
| `friendships` | requester_id, addressee_id, status (pending, accepted, declined), created_at | Ein Paar nur einmal |
| `blocks` | blocker_id, blocked_id | Blockierte sehen sich nicht und können sich nicht schreiben |
| `episodes` | rss_guid, title, shownotes_html, published_at, duration_s, guest_name, type (guest, solo), youtube_video_id, spotify_url, apple_url, pull_quote | pull_quote = Zitat für die Sprechblase, von Hand gepflegt |
| `videos` | youtube_id, title, published_at, thumbnail_url, category (podcast, vlog, extra), episode_id | category aus der YouTube-Playlist |
| `forum_categories` | slug, name, sort | 6 feste Bereiche |
| `threads` | category_id, author_id, title, body, episode_id, course_id, reply_count, last_activity_at | episode_id und course_id optional |
| `posts` | thread_id, author_id, body, created_at | Antworten |
| `direct_messages` | sender_id, recipient_id, body, read_at | Nur wenn allow_messages des Empfängers aktiv |
| `courses` | name, city, region, country, holes (9, 18, 27), par, length_m, greenfee_weekday_eur, greenfee_weekend_eur, website_url, membership_url, scorecard_url, screenshot_path, status (pending, verified, hidden), created_by, verified_by, verified_at, locked_fields text[], rating_avg, rating_count, merged_into_id | rating_avg und rating_count per Trigger |
| `course_photos` | course_id, uploader_id, storage_path, status, created_at | Höchstens 5 pro Nutzer und Platz |
| `course_ratings` | course_id, user_id, stars (1–5), comment, updated_at | Primärschlüssel (course_id, user_id) |
| `course_change_requests` | course_id, user_id, field, old_value, new_value, status (open, accepted, rejected) | Für bereits geprüfte Plätze |
| `tournaments` | user_id, name, date, course_id | Nur zukünftige werden angezeigt |
| `matches` | created_by, opponent_id, format (matchplay, strokeplay, stableford), result aus Sicht des Eintragenden (win, draw, loss), score_text, played_on, course_id, status (pending, confirmed, rejected), responded_at | Ein Datensatz pro Runde für beide Spieler |
| `notifications` | user_id, type, payload jsonb, target_route, read_at, created_at | Grundlage für Postfach und später Push |
| `reports` | reporter_id, target_type, target_id, reason, status | Meldungen aus dem Forum |

## Geschäftsregeln und Berechtigungen

Der Admin hat bei Golfplätzen immer das letzte Wort. Nutzer füllen die Datenbank, aber jeder Datensatz ist vom Admin änderbar, sperrbar und ausblendbar.

**Golfplätze**

- Neu angelegte Plätze erhalten status = pending und sind sofort mit dem Hinweis „In Prüfung" sichtbar.
- Beim Anlegen prüft die App ähnliche Namen am selben Ort und schlägt vorhandene Plätze vor, um Duplikate zu vermeiden.
- Der Ersteller darf seinen Platz bearbeiten, solange er pending ist. Nach der Freigabe erzeugen Änderungen nur noch einen Eintrag in `course_change_requests`.
- Felder in `locked_fields` ändert nur der Admin.
- Zusammenführen hängt Bewertungen, Fotos, Turniere, Duelle, Heimatclubs und Threads auf den Zielplatz um und setzt `merged_into_id`.
- Bild eines Platzes: erstes freigegebenes Foto. Ohne Foto wird einmalig ein Screenshot der Website erzeugt, bei geänderter URL neu, sonst höchstens alle 30 Tage.
- Beim Foto-Upload bestätigt der Nutzer, dass er die Rechte am Bild hat.

**Bewertungen**

- Eine Bewertung pro Nutzer und Platz. Erneutes Bewerten überschreibt die alte.
- `rating_avg` und `rating_count` berechnet ein Datenbank-Trigger, nicht die App.
- Anzeige mit einer Nachkommastelle und Komma, z. B. 4,3. Ohne Bewertung steht „Neu".

**Freunde, Turniere, Duelle**

- Freundschaft entsteht durch Anfrage und Bestätigung.
- Turniere und Duell-Bilanz sind nur für bestätigte Freunde sichtbar.
- Eine Runde trägt ein Spieler ein und wählt einen Freund als Gegner. Der Gegner erhält einen Eintrag im Postfach.
- Nur bestätigte Runden zählen in der Bilanz. Bei Ablehnung wird der Eintragende benachrichtigt und kann neu eintragen.
- Die Bilanz wird aus Sicht des Betrachters gespiegelt: Ein Sieg des einen ist die Niederlage des anderen.

**Postfach**

- Die rote Zahl = offene Rundenbestätigungen + ungelesene Benachrichtigungen + ungelesene Direktnachrichten.
- Benachrichtigungen entstehen per Datenbank-Trigger bei den im Screen Postfach genannten Ereignissen. Jeder Eintrag hat ein Sprungziel.
- Push folgt in Phase 3 und nutzt dieselbe Tabelle `notifications`.

**Rechte (Row Level Security)**

- Eigene Profile, Turniere, Bewertungen, Beiträge und Fotos darf nur der Besitzer ändern oder löschen.
- Admin-Rechte über `profiles.role = admin`, nur serverseitig setzbar.
- Blockierte Nutzer sehen keine Inhalte des Blockierenden und können ihm nicht schreiben.

**Newsletter**

- Einwilligung nur per Häkchen, standardmäßig aus, mit Double-Opt-in-Mail. Zeitpunkt und Quelle werden gespeichert.
- Nur `newsletter_status = confirmed` wird exportiert bzw. an den Anbieter übertragen.
- Systemmails wie Registrierung, Passwort und Kontolöschung laufen unabhängig vom Newsletter.

## Plausibilitätsprüfung, Datenschutz, offene Entscheidungen

| Punkt | Problem | Lösung |
| --- | --- | --- |
| Video-Quelle | Spotify-Video lässt sich in fremden Apps nicht abspielen | Video per YouTube-Player, Folgendaten per RSS |
| Heimatclub | Freitext plus eigener Screenshot hätte doppelte Platzdaten erzeugt | Auswahl aus `courses`, fehlende Plätze werden eingetragen |
| Anmeldung | Community-Funktionen brauchen ein Konto | Nutzer-Login in Phase 1, Admin-Login in Phase 2 |
| Newsletter | Double-Opt-in braucht schon in Phase 1 einen Mailversand | Transaktionsmail-Anbieter ab Phase 1 |
| Duell-Bestätigung | Push war für Phase 1 zu früh | Bestätigung im Postfach mit roter Zahl |
| Verwaltung | Admin-Oberfläche erst in Phase 2 | Bis dahin Pflege im Supabase-Dashboard |

**Pflichten für App Store und Google Play**

- Apps mit Nutzerinhalten brauchen Melden, Blockieren und eine Moderation. Das muss schon in Phase 1 funktionieren, zur Not über das Supabase-Dashboard.
- Konto löschen muss direkt in der App möglich sein, inklusive der Daten.
- Wer Google-Login anbietet, muss auf iOS auch Sign in with Apple anbieten.
- Datenschutzerklärung, Nutzungsbedingungen und Impressum müssen in der App erreichbar sein.

**Datenschutz (keine Rechtsberatung, vor dem Launch prüfen lassen)**

- Supabase in der EU-Region Frankfurt betreiben, Auftragsverarbeitungsverträge mit allen Diensten abschließen.
- Handicap, Heimatclub und Turniere sind personenbezogen. Turniere und Duelle sind deshalb nur für Freunde sichtbar.
- Website-Screenshots fremder Clubseiten sind urheberrechtlich nicht völlig unkritisch. Sie sind daher nur Ersatz, bis ein Foto vorliegt.
- Newsletter nur mit Double-Opt-in. Mailchimp ist ein US-Anbieter, Brevo sitzt in der EU.

**Offene Entscheidungen**

- [ ] Unbestätigte Runden: nach 7 Tagen automatisch zählen oder verfallen lassen?
- [ ] Neue Plätze sofort sichtbar mit „In Prüfung" oder erst nach Freigabe?
- [ ] Newsletter-Anbieter für Phase 3: Mailchimp oder Brevo?
- [ ] Transaktionsmail-Anbieter für Phase 1: Resend, Brevo oder anderer?
- [ ] Wer moderiert das Forum in Phase 1, und wie schnell?
- [ ] Zuordnung Folge zu YouTube-Video: von Hand pflegen oder per Titel-Abgleich?
- [ ] App-Name in den Stores, Bundle-ID und Entwickler-Account (Firma oder Privatperson)?

## Umsetzungsreihenfolge und Abnahme

Phase 1 in neun Schritten. Nach jedem Schritt ist die App lauffähig und testbar.

1. Projekt anlegen: Expo, TypeScript, Expo Router, Theme-Datei mit allen Design-Tokens, Schriften, Tab-Leiste, Marken-Assets.
2. Supabase: Tabellen, Trigger und RLS-Regeln aus dem Datenmodell als Migrationen, Testdaten für Entwicklung.
3. Anmeldung: Registrieren, Anmelden, Passwort vergessen, Apple, Google, Onboarding in „Mein Profil", Konto löschen.
4. Inhalte: RSS- und YouTube-Abgleich als Edge Functions, Start, Mediathek, Episode.
5. Golfplätze: Verzeichnis mit Suche und Filtern, Detailseite, Platz eintragen mit Fotos, Bewertungen, Screenshot-Ersatz.
6. Community: Themenbereiche, Diskussionen, Antworten, Direktnachrichten, Melden, Blockieren.
7. Freunde und Turniere: Anfragen, Mitgliedsprofil, eigene Turniere, Turniere der Freunde auf der Startseite.
8. Duelle und Postfach: Runde eintragen, Bestätigen oder Ablehnen, Bilanz, Benachrichtigungen, rote Zahl.
9. Newsletter-Einwilligung mit Double-Opt-in, CSV-Export per SQL-Abfrage, Tests, Store-Vorbereitung.

**Abnahmekriterien Phase 1**

- [ ] Alle 12 App-Screens entsprechen dem Mockup in Aufbau, Farben und Schriften.
- [ ] Die Wortmarke erscheint nur auf dem Rasenfoto, NEXT schwarz, FAIRWAY weiß.
- [ ] Neue Folgen aus RSS und YouTube erscheinen spätestens nach einer Stunde in der App.
- [ ] Ein Platz ist nach dem Eintragen sofort mit „In Prüfung" sichtbar, Duplikate werden vorgeschlagen.
- [ ] Bewerten ändert den Schnitt sofort, eine zweite Bewertung desselben Nutzers überschreibt die erste.
- [ ] Eine eingetragene Runde zählt erst nach Bestätigung durch den Gegner.
- [ ] Die rote Zahl an der Glocke stimmt mit den offenen und ungelesenen Einträgen überein.
- [ ] Turniere und Duell-Bilanz sind für Nicht-Freunde nicht sichtbar, auch nicht über die API.
- [ ] Melden, Blockieren und Konto löschen funktionieren.
- [ ] Newsletter-Status wird erst nach Klick in der Bestätigungsmail „confirmed".
