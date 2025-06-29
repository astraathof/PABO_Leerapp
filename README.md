# 🚀 PABO Leerapp - AI-Powered Education Platform

> **Een complete, professionele AI template met Gemini API, camera, multi-file upload, audio transcriptie, advanced TTS en meer!**
>
> **Gemaakt door Tom Naberink voor de onderwijssector**

## 🔧 Setup Instructions

### 1. Environment Configuration

**BELANGRIJK:** Configureer eerst je API keys voordat je de applicatie start.

1. Kopieer `.env.example` naar `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Verkrijg een Gemini API key:
   - Ga naar [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Maak een nieuwe API key aan
   - De key moet beginnen met "AIza"

3. Voeg je API key toe aan `.env.local`:
   ```env
   GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
   ```

### 2. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### 3. Deployment

Voor Netlify deployment:
1. Deploy via Bolt.new "Deploy to Netlify" button
2. Voeg `GEMINI_API_KEY` toe in Netlify environment variables
3. Redeploy de site

## 🔑 API Key Requirements

- **GEMINI_API_KEY**: Vereist voor alle AI-functionaliteiten
  - PDF tekstextractie
  - Afbeelding OCR
  - AI chat en analyse
  - TTS (Text-to-Speech)

## 🚨 Troubleshooting

### "API Key niet geconfigureerd" Error

1. Controleer of `.env.local` bestaat
2. Verificeer dat `GEMINI_API_KEY` correct is ingesteld
3. Herstart de development server (`npm run dev`)
4. Test je API key in [Google AI Studio](https://makersuite.google.com/app/apikey)

### PDF Extractie Problemen

De applicatie gebruikt Gemini 2.5 Flash voor PDF tekstextractie:
- Ondersteunt PDF bestanden tot 20MB
- Automatische fallback bij problemen
- Werkt met beveiligde PDFs (beperkt)

### Deployment Issues

Voor Netlify:
- Zorg dat `GEMINI_API_KEY` is ingesteld in Netlify dashboard
- Build command: `npm run build`
- Publish directory: laat leeg voor Next.js

## ✨ Features

### 🎯 Core AI Functionaliteiten
- 🧠 **Multi-Model AI**: Gemini 2.5 Pro, 2.5 Flash, en 2.0 Flash
- 📸 **Multi-Image Analysis**: Meerdere afbeeldingen tegelijk analyseren
- 🎵 **Audio Transcriptie**: Gemini 2.5 Flash voor speech-to-text
- 💬 **Markdown Rendering**: Perfecte opmaak van AI responses
- ⚡ **Streaming Responses**: Real-time AI response weergave

### 📁 **Geavanceerd File Management**
- 🖼️ **Afbeeldingen**: JPG, PNG, GIF, WebP, BMP - met Gemini Vision OCR
- 📄 **Documenten**: PDF (Gemini extractie), DOCX, TXT, MD
- 📱 **Camera Capture**: Direct foto's maken vanuit de browser
- 🎯 **Drag & Drop**: Bestanden slepen en neerzetten

### 🎨 **User Experience**
- 💜 **Modern Design**: Strakke interface met Tailwind CSS
- 📱 **Mobile First**: Perfect responsive op alle apparaten
- ⚡ **Real-time Feedback**: Loading states, progress indicators
- 🔒 **Secure**: Alle API keys blijven server-side

## 📚 Module Overzicht

1. **Curriculum & Kerndoelen** - Alle 58 kerndoelen interactief
2. **Ontwikkelingspsychologie** - Theorie en praktijk
3. **SEL & Klassenmanagement** - Sociaal-emotioneel leren
4. **Differentiatie & Inclusie** - Onderwijs op maat
5. **Data & Evaluatie** - Data-gedreven besluitvorming
6. **21e-eeuwse Vaardigheden** - Toekomstgericht onderwijs
7. **Schoolleiderschap** - Pedagogisch leiderschap
8. **Burgerschap & Diversiteit** - Interculturele competentie
9. **Cito & Monitoring** - Complete monitoring gids
10. **Inspectie Onderzoekskader** - Inspectie voorbereiding
11. **MR & WMS** - Medezeggenschapsraad gids

## 🔧 Technical Stack

- **Framework**: Next.js 15
- **AI**: Google Gemini 2.5 Flash/Pro
- **Styling**: Tailwind CSS
- **File Processing**: Mammoth (DOCX), Gemini Vision (Images/PDF)
- **Deployment**: Netlify optimized

## 📞 Support

- **GitHub**: [Repository Issues](https://github.com/TomNaberink/templateAPIinclcamera/issues)
- **Creator**: Tom Naberink - [LinkedIn](https://linkedin.com/in/tomnaberink)

---

**💜 Gemaakt met passie door Tom Naberink**  
**🚀 Voor de toekomst van onderwijs!**