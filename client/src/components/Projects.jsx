import { useState } from 'react'
import hipaaVideo from '../assets/hipaa-preview.mp4'
import fhirVideo from '../assets/fhir-preview.mp4'
import rbacVideo from '../assets/rbac-preview.mp4'

const projects = [
  {
    number: '01',
    title: 'HIPAA Audit Log',
    short: `An audit log for patient records where you can't quietly change the history. Every access is logged: who did it, which record, what they did, and whether they were even allowed to.`,
    full: `I built an audit log for patient records where you can't quietly change the history. Every time someone opens a record it gets logged: who did it, which record, what they did, and whether they were even allowed to. Refused attempts get logged too. If a physician goes looking at a patient he has no treatment relationship with, a system that only records successful views has no idea it happened, and that's exactly what auditors hunt for.\n\nThe part I care about is that the trail is tamper evident. Every entry stores a SHA-256 hash of its own contents plus the hash of the entry before it, so they're chained together. Edit an old entry and its hash stops matching, and because the next entry stored the old one, the break cascades forward. There's a verify function that walks the chain and names the first entry where it breaks. You can try it on the live demo. What it doesn't do: a hash chain proves nothing was altered, but it won't stop someone deleting the whole file and starting fresh. Real systems close that with append only storage and offsite replication. Knowing where the line is felt more useful than pretending it wasn't there.`,
    tags: ['Node.js', 'Express', 'HIPAA', 'SHA-256', 'Healthcare'],
    live: 'https://hipaa-audit-log.onrender.com',
    github: 'https://github.com/SamanthaMakowski/hipaa-audit-log',
    video: hipaaVideo,
    demo: null,
    flipContent: `Go to the live site and log a few patient record accesses. Then hit the verify endpoint. It walks the entire chain and returns the exact entry where the hash stops matching. That break cascades forward automatically because each entry stores the hash of the one before it. The audit log is stored in a JSON file here for visibility. In a production system that file would be append only with offsite replication. You can see the raw entries, but you cannot quietly change them without the chain catching it.`,
  },
  {
    number: '02',
    title: 'FHIR Patient Data Explorer',
    short: `Pulls patient demographics, conditions, medications, and allergies from a live FHIR server. The standard modern EHR systems like Epic use to exchange data.`,
    full: `I built a web app that pulls patient demographics, conditions, medications, and allergies from a live FHIR server and displays them in an interface styled like a real EHR. FHIR is the standard modern electronic health records like Epic use to exchange data, so I wanted to work with it the way health systems actually do rather than just reading about it.\n\nThe browser doesn't talk to the FHIR server directly. A Node and Express backend sits in between as a proxy, which is the same pattern real health apps use to keep clinical data behind a controlled backend. The frontend is vanilla JavaScript and CSS, with a patient banner, sidebar navigation, and status badges that come from actual FHIR fields, not placeholders.`,
    tags: ['JavaScript', 'Node.js', 'FHIR', 'Healthcare', 'Express'],
    live: 'https://fhir-patient-explorer.onrender.com',
    github: 'https://github.com/SamanthaMakowski/fhir-patient-explorer',
    video: fhirVideo,
    demo: [
      { id: '137222733', note: 'Every tab populated' },
      { id: '137222734', note: 'Allergy heavy' },
      { id: '137222735', note: 'Medication heavy' },
      { id: '137222736', note: 'Conditions, meds & allergies' },
      { id: '137222737', note: 'Conditions, meds & allergies' },
    ],
    flipContent: null,
  },
  {
    number: '03',
    title: 'Role Based Patient Records',
    short: `A patient records app where the same chart shows different things depending on who's looking. A doctor, nurse, receptionist, and admin all see a different version of the same record.`,
    full: `I built a patient records app where the same chart shows different things depending on who's looking at it. A doctor, nurse, receptionist, and admin all open the same patient and see a different version because in healthcare you're only supposed to see what your job actually requires. That's the HIPAA minimum necessary rule built into code.\n\nThe enforcement happens server side in a Node and Express REST API, never in the browser. Each role runs against an allowlist in a single policy file so the API only ever returns the fields that role is cleared for. Clinical fields are dropped completely so they never leave the server. The SSN comes back redacted with a label so you can see something was withheld. Unrecognized roles fail closed and return an empty record. You can open the network tab as a receptionist and the clinical data literally isn't in the response. It was never sent.`,
    tags: ['JavaScript', 'Node.js', 'RBAC', 'IAM', 'REST API'],
    live: 'https://rbac-patient-records.onrender.com',
    github: 'https://github.com/SamanthaMakowski/rbac-patient-records',
    video: rbacVideo,
    demo: null,
    flipContent: `Log in as a receptionist, then open your browser network tab and pull a patient record. The clinical fields are not hidden on screen. They are not in the API response at all. They never left the server. Switch to doctor and compare what comes back. Then try a role the system doesn't recognize. It fails closed and returns an empty record, not everything.`,
  },
  {
    number: '04',
    title: 'This Portfolio',
    short: null,
    full: null,
    tags: [],
    live: '/',
    github: 'https://github.com/SamanthaMakowski/samantha-portfolio',
    video: null,
    demo: null,
    flipContent: `Open the GitHub repo and look at the BE folder. There are two backend servers running behind this page right now. One is tracking every visit, referrer, and device type in real time. One is ready to answer questions about my resume using retrieval. The binary background, typewriter effect, stacking cards, and flip panels are all hand coded. Nothing here came from a template.`,
  },
]

function ReadMore({ short, full }) {
  const [expanded, setExpanded] = useState(false)

  if (!short && !full) return null

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ position: 'relative' }}>
        {expanded ? (
          full.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: i < full.split('\n\n').length - 1 ? '1rem' : 0,
            }}>
              {para}
            </p>
          ))
        ) : (
          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              overflow: 'hidden',
              maxHeight: '80px',
            }}>
              {short}
            </p>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '30px',
              background: 'linear-gradient(transparent, rgba(13, 15, 22, 0.97))',
            }} />
          </div>
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none',
          border: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
          cursor: 'pointer',
          padding: '4px 0 0',
        }}
      >
        {expanded ? '- Read less' : '+ Read more'}
      </button>
    </div>
  )
}

function FlipPanel({ video, demo, flipContent }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{ perspective: '800px', height: '240px', cursor: 'pointer' }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '10px',
            border: '0.5px solid rgba(212, 160, 176, 0.1)',
            background: 'rgba(212, 160, 176, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {video ? (
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'rgba(212, 160, 176, 0.25)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Preview Coming Soon
              </p>
            )}
          </div>

          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '10px',
            border: '0.5px solid rgba(212, 160, 176, 0.1)',
            background: 'rgba(20, 16, 28, 0.98)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflowY: 'auto',
          }}>
            {demo ? (
              <>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '8px',
                  flexShrink: 0,
                }}>
                  Try these patient IDs
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        color: 'rgba(212,160,176,0.5)',
                        textAlign: 'left',
                        paddingBottom: '6px',
                        borderBottom: '0.5px solid rgba(212,160,176,0.1)',
                        fontWeight: 400,
                      }}>Patient ID</th>
                      <th style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        color: 'rgba(212,160,176,0.5)',
                        textAlign: 'left',
                        paddingBottom: '6px',
                        borderBottom: '0.5px solid rgba(212,160,176,0.1)',
                        fontWeight: 400,
                      }}>Shows</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demo.map((patient, k) => (
                      <tr key={k}>
                        <td style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: 'var(--accent)',
                          padding: '4px 0',
                          borderBottom: '0.5px solid rgba(212,160,176,0.06)',
                        }}>{patient.id}</td>
                        <td style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.68rem',
                          color: 'var(--text-muted)',
                          padding: '4px 8px',
                          borderBottom: '0.5px solid rgba(212,160,176,0.06)',
                        }}>{patient.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'rgba(212,160,176,0.3)',
                  letterSpacing: '0.08em',
                  marginTop: '10px',
                  lineHeight: 1.6,
                }}>
                  These IDs pull from the public HAPI FHIR R4 sandbox at hapi.fhir.org. The sandbox resets periodically so these IDs may expire. To find current ones visit hapi.fhir.org/baseR4/Patient in your browser and use any id field in the response.
                </p>
              </>
            ) : (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
              }}>
                {flipContent}
              </p>
            )}
          </div>
        </div>
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        color: 'rgba(212, 160, 176, 0.35)',
        textTransform: 'uppercase',
        textAlign: 'center',
      }}>
        {flipped ? 'click to flip back' : 'click to flip'}
      </p>
    </div>
  )
}

export default function Projects() {
  return (
    <section style={{
      position: 'relative',
      zIndex: 1,
      padding: '1rem 0 0',
    }}>
      <div style={{
        padding: '0 2rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '0.75rem',
        }}>
          Projects
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '0.5rem',
        }}>
          Built to prove it.
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
        }}>
          Scroll to explore
        </p>
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 2rem 300px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {projects.map((project, i) => (
          <div key={i} style={{
            position: 'sticky',
            top: `${80 + i * 16}px`,
            borderRadius: '16px',
            border: '0.5px solid rgba(212, 160, 176, 0.12)',
            background: 'rgba(13, 15, 22, 0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: '1rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: 'rgba(212, 160, 176, 0.4)',
                marginBottom: '0.75rem',
              }}>
                {project.number}
              </p>
              {project.tags.length > 0 && (
                <div style={{
                  display: 'flex',
                  gap: '5px',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem',
                }}>
                  {project.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      padding: '2px 8px',
                      borderRadius: '2px',
                      border: '0.5px solid rgba(212, 160, 176, 0.25)',
                      color: 'var(--accent)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
                lineHeight: 1.2,
              }}>
                {project.title}
              </h3>
              <ReadMore short={project.short} full={project.full} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={project.live} target="_blank" rel="noreferrer" style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                }}>
                  Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: '0.5px solid rgba(212, 160, 176, 0.35)',
                  color: 'var(--accent)',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                }}>
                  GitHub
                </a>
              </div>
            </div>
            <FlipPanel video={project.video} demo={project.demo} flipContent={project.flipContent} />
          </div>
        ))}
      </div>
    </section>
  )
}