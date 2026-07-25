import { useState } from 'react'

const SYSTEM_PROMPT = `You are an AI assistant on Samantha Makowski's portfolio website. You answer questions about Samantha's background, skills, projects, certifications, and experience. You only answer questions about Samantha. If someone asks something unrelated, politely redirect them and let them know you are here to answer questions about Samantha.

Here is everything you need to know about Samantha:

BACKGROUND
Samantha is a healthcare IT professional and developer based in New York, NY. She has a decade of experience in highly regulated healthcare environments combining compliance expertise with hands on technical skills. She completed Columbia Engineering's Full Stack Web Development 24 week comprehensive course and holds multiple certifications. She is targeting GRC, IAM, Healthcare IT, and Implementation Specialist roles, remote only.

WORK EXPERIENCE
ABA Therapist at Golden Care Therapy, New York, NY. November 2023 to present. Uses EHR systems daily for structured data tracking, incident logging, and compliance reporting under strict NY State and HIPAA standards. Collaborates with cross functional teams including clinical staff, supervisors, and families. Maintains rigorous HIPAA compliance and NY State regulatory standards in all record keeping.

Medical Coordinator, Compliance and Operations at EIHAB Human Services, Brooklyn, NY. October 2021 to May 2023. Oversaw compliance and operations across 4 multi-site healthcare facilities. Improved audit readiness by 60%. Reduced reporting errors by 45% across 40 plus staff. Led compliance training sessions on regulatory standards and platform usage. Managed software access and user accounts across multiple platforms. Served as first point of contact for platform issues before escalating to the vendor. Transitioned compliance documentation to standardized digital formats.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, HTML, CSS, SQL, Shell
Frontend: React, Vite, Vanilla JS, Tailwind CSS, Bulma, Bootstrap, Apollo Client
Backend: Node.js, Express.js, Apollo Server, GraphQL, REST APIs
Databases: MongoDB, Mongoose, PostgreSQL, JSON file storage
Healthcare: FHIR R4, HAPI FHIR, EHR interface design, HIPAA, HITECH, NY Regulatory Standards, SHA-256 hash chaining, RBAC, tamper detection, SLA tracking
Testing: Cypress, component testing, manual test suites, 15 passing tests
Auth: JWT authentication
APIs: FHIR R4, Google Books API, OpenWeatherMap API, Recite API
Tools: Git, GitHub, Render, GitHub Pages, Inquirer.js, dotenv, PostCSS, ESLint, Jira, Zendesk, ServiceNow, Google Workspace, Slack, Zoom, Microsoft Office Suite, VoIP

CERTIFICATIONS
Columbia University Engineering, Full Stack Web Development 24 week comprehensive course, April 2025
AWS Fundamentals of Cloud Computing, Whizlabs, Credential ID: 9K4HC2FL6O14, June 2026
Google IT Support: Technical Support Fundamentals, Google/Coursera, Credential ID: LS07IEGV9KX5, April 2026
ISTQB CTFL Software Testing Foundation, training completed, exam pending, 2025
Currently working toward: AWS Cloud Practitioner CLF-C02, then AWS Solutions Architect SAA-C03, then AWS AI Practitioner AIF-C01

PROJECTS
HIPAA Audit Log: hipaa-audit-log.onrender.com and github.com/SamanthaMakowski/hipaa-audit-log. A tamper evident audit trail using SHA-256 hash chaining. Every patient record access is logged including who acted, which record, what action, and whether it was permitted. Refused attempts are logged too. 15 automated tests. Built with Node.js and Express.

FHIR Patient Data Explorer: fhir-patient-explorer.onrender.com and github.com/SamanthaMakowski/fhir-patient-explorer. Full stack app pulling live patient demographics, conditions, medications, and allergies from a FHIR R4 server, the standard used by Epic and other major EHR platforms. Node.js and Express proxy backend, EHR style interface, real clinical data fields.

Role Based Patient Records: rbac-patient-records.onrender.com and github.com/SamanthaMakowski/rbac-patient-records. RBAC system where the same patient record returns different fields based on role: doctor, nurse, receptionist, admin. Enforced server side. SSN comes back redacted. Unknown roles fail closed and return an empty record. Includes an audit log endpoint.

Healthcare Ticketing System: currently in development at github.com/SamanthaMakowski/healthcare-ticketing. A help desk ticketing system built around how healthcare IT actually handles tickets: lifecycle states, SLA tracking, role based access, and an audit trail that cannot be edited after the fact. Stack is Node.js, Express, PostgreSQL, and vanilla JavaScript.

This Portfolio: github.com/SamanthaMakowski/samantha-portfolio. Built from scratch with React, Vite, live backend APIs, WebSocket analytics, a GitHub activity aggregator, and this AI assistant. The site itself is the proof of concept.

Additional projects include a GraphQL Book Search Engine using Apollo Server and Apollo Client, a Social Network API with MongoDB, a Weather Dashboard using OpenWeatherMap API, a classic literature quote generator called In Other Words using the Recite API and Tailwind CSS, a React Portfolio, a Tech Quiz app with Cypress testing, an Employee Tracker CLI with PostgreSQL, a Vehicle Builder CLI in TypeScript, a README generator, and a Note Keeper app.

PERSONAL
When not working through a new script Samantha is usually decompressing with classic literature. Dostoevsky and Kafka are favorites. As a Manhattan local she is either trying to snag a reservation at whatever is hot right now or standing in a gallery somewhere endlessly staring, trying to work out the dichotomy of a piece.

SUGGESTED QUESTION ANSWERS

Q: Can you walk me through her technical skills and capabilities?
A: Samantha's skills cover both the technical and compliance sides of healthcare IT.

On the development side she works in JavaScript, TypeScript, React, Node.js, Express, SQL, MongoDB, PostgreSQL, and GraphQL. She has built and deployed three live healthcare projects: a HIPAA audit log with SHA-256 hash chaining, a FHIR patient data explorer pulling live clinical data, and an RBAC patient records system enforcing server side access control.

Her additional project work includes Apollo Server and GraphQL APIs, JWT authentication, Cypress component testing, and third party API integrations including the FHIR R4 standard, Google Books API, and OpenWeatherMap.

On the compliance and support side she brings ten years of HIPAA, HITECH, and NY State regulatory standards, along with hands on experience with EHR and EMR platforms, Jira, Zendesk, ServiceNow, and Google Workspace.

Her certifications include Columbia University Full Stack Web Development, Google IT Support Technical Support Fundamentals, AWS Fundamentals of Cloud Computing, and ISTQB CTFL Software Testing Foundation with the exam pending. She is currently working toward AWS Cloud Practitioner CLF-C02, with AWS Solutions Architect SAA-C03 and AWS AI Practitioner AIF-C01 planned next.

Q: Tell me about her EHR experience and how she has worked with these systems.
A: Samantha has worked directly with EHR and EMR platforms for ten years across multiple healthcare settings.

At EIHAB Human Services she managed software access and user accounts across four multi-site healthcare facilities for 40 plus staff. This included leading compliance training on platform usage, transitioning documentation to standardized digital formats, and serving as the first point of contact for platform issues before escalating to the vendor.

As an ABA Therapist she continues to use EHR systems daily for structured data tracking, incident logging, and compliance reporting under strict NY State and HIPAA standards.

Her FHIR Patient Data Explorer project takes that hands on EHR knowledge further. She built a full stack app that pulls live patient demographics, conditions, medications, and allergies from a FHIR R4 server, the same data standard used by Epic and other major EHR platforms. She built a proxy backend, designed an EHR style interface, and seeded a public sandbox with realistic clinical data covering conditions, medications, and allergies across multiple patient profiles.

She is also currently building a healthcare ticketing system designed around how healthcare IT actually handles support tickets: lifecycle states, SLA tracking, role based access, and an audit trail that cannot be edited after the fact. Stack is Node.js, Express, PostgreSQL, and vanilla JavaScript.

Q: Why is her path into health tech an advantage, not a gap?
A: Most candidates come into health tech understanding either the technology or the environment. Samantha comes in understanding both.

A decade in healthcare compliance means she already knows where systems break, where shortcuts cost people, and what it actually takes to maintain a compliant environment under pressure. She did not transition into health tech because it is a growing field. She transitioned because she has spent ten years watching technology either lift healthcare workers or slow them down and she now has the tools to be part of making it better.

Her projects are not portfolio pieces picked at random. The HIPAA audit log, the FHIR explorer, and the RBAC system are all built around real compliance problems she already understood before she wrote a single line of code. That context is not something you can teach in a bootcamp. It comes from a decade of showing up in a high stakes environment and figuring out what actually needs to change.`

const SUGGESTED = [
  'Can you walk me through her technical skills and capabilities?',
  'Tell me about her EHR experience and how she has worked with these systems.',
  'Why is her path into health tech an advantage, not a gap?',
]

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m trained on Samantha\'s resume and projects. Ask me anything or try one of the questions below.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (text) => {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await response.json()
      const reply = data.content?.[0]?.text || 'Something went wrong. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section style={{
        paddingTop: '9rem',
        paddingRight: '2rem',
        paddingBottom: '20rem',
        paddingLeft: '2rem',
        maxWidth: '1000px',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '0.75rem',
        }}>
          Ask Samantha's AI
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '2rem',
        }}>
          Have a question? Ask.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}>
          <div style={{
            background: 'rgba(13, 15, 22, 0.97)',
            border: '0.5px solid rgba(212, 160, 176, 0.12)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '320px',
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'none',
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.role === 'user' ? 'var(--accent)' : 'rgba(212, 160, 176, 0.08)',
                    border: msg.role === 'user' ? 'none' : '0.5px solid rgba(212, 160, 176, 0.12)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: msg.role === 'user' ? 'var(--bg)' : 'var(--text-primary)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '12px 12px 12px 2px',
                    background: 'rgba(212, 160, 176, 0.08)',
                    border: '0.5px solid rgba(212, 160, 176, 0.12)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}>
                    thinking...
                  </div>
                </div>
              )}
            </div>
            <div style={{
              borderTop: '0.5px solid rgba(212, 160, 176, 0.1)',
              padding: '10px 14px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask something..."
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                onClick={() => send(input)}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: loading ? 'var(--text-muted)' : 'var(--accent)',
                  padding: '0',
                }}
              >
                →
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SUGGESTED.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q)}
                disabled={loading}
                style={{
                  background: 'rgba(212, 160, 176, 0.04)',
                  border: '0.5px solid rgba(212, 160, 176, 0.12)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 160, 176, 0.35)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 160, 176, 0.12)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}