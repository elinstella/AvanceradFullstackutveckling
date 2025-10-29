

# Reflektionsuppgift – Avancerad Fullstackutveckling

**Elin Stella Alisdey**  
_31 oktober 2025_

---

## 1. Vad hände och varför spelar det roll?

I detta projekt byggde jag ett enkelt fullstack-upplägg med Express-API och React/Vite där huvudfokus låg på DevOps, inte funktionalitet.  
Den avgörande situationen inträffade när jag införde en CI-pipeline via GitHub Actions. Lokalt fungerade allt som vanligt, men i CI-miljön bröts testerna direkt eftersom Jest inte stödde ESM-syntaxen jag använde.

Det här spelade stor roll eftersom det tydligt visade hur viktigt det är med en standardiserad, reproducerbar körmiljö.  
CI stoppade koden innan den mergeades in i main — vilket var precis vad jag ville uppnå: att pipeline-flödet ska fånga fel tidigt, innan de når stabil branch.

Utfallet påverkades direkt av:

- **Versionshantering:** Pull requests som triggade pipelines
- **CI/CD-steg:** Automatisk testkörning och byggsteg
- **Körmiljö:** En ren miljö som inte accepterade implicit ESM

Det var första gången jag litade fullt på att pipelineflödet styr kvaliteten, inte min lokala dator.

---

## 2. Vad lärde du dig om arbetssättet?

Jag lärde mig att DevOps-arbetssättet vinner eftersom det bygger på tre principer: små steg, tidig feedback och automatisering.

### Små steg

Att bygga upp projektet i mindre delar gjorde det mycket enklare att felsöka.  
Små ändringar = små fel = lättare att förstå vad som händer.

### Tidig feedback

Pipelinefel gav exakta rader och exakta orsaker.  
Lokalt hade jag aldrig märkt ESM-buggen, men CI fångade den direkt.  
Jag insåg att CI är en “ärlig domare” — den kör exakt det jag instruerar, utan att gissa.

### Automatisering

Jag underskattade hur mycket automation förenklar.  
Pipeline testade koden identiskt varje gång, vilket tog bort manuellt dubbelarbete.  
Det överraskade mig hur snabbt små misstag upptäcks när processen är helt automatiserad.

Utfallet blev som det blev eftersom DevOps-tänket tvingar fram kvalitet genom struktur, inte vilja.

---

## 3. Vad gör du annorlunda nästa gång?

Nästa gång skulle jag:

- sätta upp CI direkt innan jag skriver första funktionen
- arbeta strikt via feature branches och pull requests
- införa caching tidigt för snabbare pipelines
- lägga till linting för kodstil
- containerisera tidigare för att standardisera miljön

Överlag skulle jag låta pipelinen styra utvecklingen ännu tydligare från start.

---

## 4. Lärdom från kursen

Det jag tar med mig är framför allt:

✅ **“Hela pipelinen är produkten.”**

Jag kommer alltid tänka på systemutveckling som mer än kod — det handlar också om automation, miljöer, tester, struktur och leveransflöde.  
Jag tar med mig förståelsen för hur containerisering, CI/CD och versionshantering hänger ihop i en helhet som gör utvecklingen snabbare och stabilare.

Den insikten förändrar hur jag bygger projekt framåt.

---

## 5. Artefakt (Evidens)

👉 **Länk till min senaste CI-run:**  
`https://github.com/elinstella/AvanceradFullstackutveckling/actions/runs/18922231232`
