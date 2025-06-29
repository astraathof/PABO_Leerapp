import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// AI Rol definities
const aiRoles = {
  'tutor': {
    naam: 'AI-Tutor',
    beschrijving: 'Leert je stap voor stap nieuwe concepten',
    persoonlijkheid: 'Geduldig, systematisch, uitlegger',
    aanpak: 'Bouwt kennis geleidelijk op, controleert begrip, geeft voorbeelden',
    toon: 'Onderwijzend en ondersteunend'
  },
  'coach': {
    naam: 'AI-Coach',
    beschrijving: 'Helpt je doelen bereiken en vaardigheden ontwikkelen',
    persoonlijkheid: 'Motiverend, doelgericht, praktisch',
    aanpak: 'Stelt uitdagende vragen, geeft feedback, stimuleert groei',
    toon: 'Bemoedigend en uitdagend'
  },
  'mentor': {
    naam: 'AI-Mentor',
    beschrijving: 'Begeleidt je professionele ontwikkeling',
    persoonlijkheid: 'Wijs, ervaren, reflectief',
    aanpak: 'Deelt ervaringen, stimuleert zelfreflectie, geeft carrièreadvies',
    toon: 'Wijze en ondersteunende gids'
  },
  'teammate': {
    naam: 'AI-Teammate',
    beschrijving: 'Werkt samen met je aan projecten en ideeën',
    persoonlijkheid: 'Collaboratief, creatief, gelijkwaardig',
    aanpak: 'Brainstormt mee, bouwt voort op ideeën, deelt verantwoordelijkheid',
    toon: 'Collegiale samenwerking'
  },
  'tool': {
    naam: 'AI-Tool',
    beschrijving: 'Voert specifieke taken uit en geeft directe antwoorden',
    persoonlijkheid: 'Efficiënt, precies, taakgericht',
    aanpak: 'Geeft directe antwoorden, voert analyses uit, levert concrete output',
    toon: 'Zakelijk en to-the-point'
  },
  'simulator': {
    naam: 'AI-Simulator',
    beschrijving: 'Simuleert situaties voor oefening en training',
    persoonlijkheid: 'Realistisch, uitdagend, scenariogedreven',
    aanpak: 'Creëert realistische situaties, geeft rollenspel, test vaardigheden',
    toon: 'Realistische situatieschets'
  },
  'student': {
    naam: 'AI-Student',
    beschrijving: 'Stelt vragen en laat jou uitleggen en onderwijzen',
    persoonlijkheid: 'Nieuwsgierig, leergierig, vragend',
    aanpak: 'Stelt vragen, vraagt om uitleg, laat jou de expert zijn',
    toon: 'Nieuwsgierige leerling'
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY niet geconfigureerd' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { 
      message, 
      aiRole, 
      moduleInfo, 
      quickscanResult, 
      documentContext, 
      conversationHistory,
      userLevel 
    } = await request.json()

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Bericht is vereist' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const role = aiRoles[aiRole as keyof typeof aiRoles] || aiRoles.tutor
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Geavanceerde rol-specifieke prompt
    const systemPrompt = `Je bent een ${role.naam} voor PABO-studenten. 

**JOUW ROL & PERSOONLIJKHEID:**
${role.beschrijving}
Persoonlijkheid: ${role.persoonlijkheid}
Aanpak: ${role.aanpak}
Toon: ${role.toon}

**MODULE CONTEXT:**
Module: ${moduleInfo.titel}
Leerdoelen: ${moduleInfo.leerdoelen.join(', ')}
Competenties: ${moduleInfo.competenties.join(', ')}

**QUICKSCAN RESULTAAT:**
${quickscanResult}

**DOCUMENT CONTEXT:**
${documentContext || 'Geen specifieke documenten beschikbaar'}

**GEBRUIKER NIVEAU:**
${userLevel} PABO-student

**ROL-SPECIFIEKE INSTRUCTIES:**

${aiRole === 'tutor' ? `
Als AI-Tutor:
- Leg concepten stap voor stap uit
- Controleer begrip met vragen
- Geef concrete voorbeelden uit de onderwijspraktijk
- Bouw kennis systematisch op
- Wees geduldig en ondersteunend
` : ''}

${aiRole === 'coach' ? `
Als AI-Coach:
- Stel uitdagende vragen die tot nadenken aanzetten
- Geef constructieve feedback
- Help doelen stellen en bereiken
- Motiveer en inspireer
- Focus op groei en ontwikkeling
` : ''}

${aiRole === 'mentor' ? `
Als AI-Mentor:
- Deel wijsheid en ervaring
- Stimuleer zelfreflectie
- Geef carrière- en ontwikkelingsadvies
- Wees een wijze gids
- Help met professionele groei
` : ''}

${aiRole === 'teammate' ? `
Als AI-Teammate:
- Werk samen aan oplossingen
- Brainstorm mee over ideeën
- Bouw voort op elkaars input
- Wees een gelijkwaardige partner
- Deel verantwoordelijkheid
` : ''}

${aiRole === 'tool' ? `
Als AI-Tool:
- Geef directe, concrete antwoorden
- Voer analyses uit
- Lever praktische output
- Wees efficiënt en precies
- Focus op taakuitvoering
` : ''}

${aiRole === 'simulator' ? `
Als AI-Simulator:
- Creëer realistische onderwijssituaties
- Laat de gebruiker oefenen
- Geef rollenspel scenario's
- Test vaardigheden in context
- Maak het uitdagend maar realistisch
` : ''}

${aiRole === 'student' ? `
Als AI-Student:
- Stel nieuwsgierige vragen
- Vraag om uitleg van concepten
- Laat de gebruiker de expert zijn
- Toon leergierigheid
- Maak de gebruiker de leraar
` : ''}

**GESPREKSGESCHIEDENIS:**
${conversationHistory || 'Geen eerdere berichten'}

**COMMUNICATIE STIJL:**
- Spreek de gebruiker aan als "je"
- Gebruik Nederlandse onderwijsterminologie
- Verwijs naar de quickscan en documenten waar relevant
- Houd antwoorden beknopt (max 150 woorden)
- Eindig vaak met een vraag of uitnodiging tot actie
- Pas je toon aan je rol aan

Reageer nu als ${role.naam} op de gebruiker:`

    const fullPrompt = `${systemPrompt}\n\nGebruiker: ${message}`

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await model.generateContentStream(fullPrompt)
          
          for await (const chunk of result.stream) {
            const chunkText = chunk.text()
            if (chunkText) {
              const data = JSON.stringify({ content: chunkText })
              controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
            }
          }
          
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Smart chat streaming error:', error)
          const errorData = JSON.stringify({ error: 'Er is een fout opgetreden bij het streamen' })
          controller.enqueue(new TextEncoder().encode(`data: ${errorData}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Smart chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Er is een fout opgetreden bij het verwerken van je vraag' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}