const categories = [
  {
    title: 'Compliance',
    skills: [
      { name: 'HIPAA', years: 10 },
      { name: 'Audit Readiness', years: 10 },
      { name: 'NY Regulatory Standards', years: 10 },
      { name: 'Compliance Documentation', years: 10 },
    ]
  },
  {
    title: 'Help Desk & Support',
    skills: [
      { name: 'Incident Documentation', years: 10 },
      { name: 'IT Troubleshooting', years: 2 },
      { name: 'Remote Support', years: 2 },
      { name: 'User Onboarding & Training', years: 2 },
      { name: 'First Call Resolution', years: 0 },
    ]
  },
  {
    title: 'Systems & OS',
    skills: [
      { name: 'EHR/EMR Platforms', years: 10 },
      { name: 'SaaS Applications', years: 4 },
      { name: 'Google Workspace', years: 2 },
      { name: 'Windows', years: 1 },
      { name: 'macOS', years: 1 },
    ]
  },
  {
    title: 'Collaboration Tools',
    skills: [
      { name: 'Microsoft Office Suite', years: 8 },
      { name: 'Zoom', years: 5 },
      { name: 'Slack', years: 2 },
      { name: 'VoIP', years: 0 },
    ]
  },
  {
    title: 'Ticketing Systems',
    skills: [
      { name: 'Zendesk', years: 2 },
      { name: 'Jira', years: 1 },
      { name: 'ServiceNow', years: 0 },
    ]
  },
  {
    title: 'Networking',
    skills: [
      { name: 'TCP/IP', years: 0 },
      { name: 'DNS', years: 0 },
      { name: 'DHCP', years: 0 },
      { name: 'VPN', years: 0 },
    ]
  },
  {
    title: 'Development & QA',
    skills: [
      { name: 'React', years: 1 },
      { name: 'Node.js', years: 1 },
      { name: 'JavaScript', years: 1 },
      { name: 'SQL', years: 1 },
      { name: 'MongoDB', years: 1 },
      { name: 'Git/GitHub', years: 1 },
      { name: 'Cypress', years: 1 },
    ]
  },
]

function getBadgeStyle(years) {
  if (years >= 10) return {
    background: 'rgba(212, 160, 176, 0.75)',
    color: '#0f0a0d',
    border: 'none',
  }
  if (years >= 4) return {
    background: 'rgba(212, 160, 176, 0.2)',
    color: '#e8c4d0',
    border: 'none',
  }
  if (years >= 1) return {
    background: 'transparent',
    color: '#d4a0b0',
    border: '0.5px solid rgba(212, 160, 176, 0.35)',
  }
  return {
    background: 'transparent',
    color: '#a08090',
    border: '0.5px solid rgba(212, 160, 176, 0.2)',
  }
}

export default function Skills() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 2rem 6rem',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
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
          Skills
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '2rem',
        }}>
          Everything I've picked up along the way.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
        }}>
          {categories.map((cat, i) => (
            <div key={i} style={{
              background: 'rgba(9, 10, 12, 0.55)',
              border: '0.5px solid rgba(212, 160, 176, 0.15)',
              borderRadius: '6px',
              padding: '10px 12px',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '8px',
              }}>
                {cat.title}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                {cat.skills.map((skill, j) => {
                  const badge = getBadgeStyle(skill.years)
                  return (
                    <span key={j} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      padding: '2px 7px',
                      borderRadius: '2px',
                      background: badge.background,
                      color: badge.color,
                      border: badge.border,
                    }}>
                      {skill.name}{skill.years > 0 ? ` ${skill.years}y` : ''}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}