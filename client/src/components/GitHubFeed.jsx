export default function GitHubFeed() {
  const commits = [
    { repo: 'samantha-portfolio', msg: 'add terminal component and bounce animation', time: '2h ago' },
    { repo: 'hipaa-audit-log', msg: 'add hash chain tamper detection and verify endpoint', time: '2d ago' },
    { repo: 'fhir-patient-explorer', msg: 'add FHIR R4 proxy and patient data endpoint', time: '3d ago' },
    { repo: 'rbac-patient-records', msg: 'add role based field filtering server side', time: '4d ago' },
    { repo: 'samantha-portfolio', msg: 'add contact section with EmailJS integration', time: '5h ago' },
    { repo: 'samantha-portfolio', msg: 'add projects section with stacking cards and flip panels', time: '6h ago' },
    { repo: 'samantha-portfolio', msg: 'add skills section with experience based badge styling', time: '1d ago' },
    { repo: 'hipaa-audit-log', msg: 'add SHA-256 hash chain and 15 passing tests', time: '3d ago' },
    { repo: 'fhir-patient-explorer', msg: 'seed patient data with conditions meds and allergies', time: '4d ago' },
    { repo: 'rbac-patient-records', msg: 'add audit log endpoint and access trail', time: '5d ago' },
  ]

  const items = [...commits, ...commits]

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: 'rgba(212, 160, 176, 0.04)',
      borderTop: '0.5px solid rgba(212, 160, 176, 0.1)',
      padding: '10px 0',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'ticker 70s linear infinite',
      }}>
        {items.map((commit, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            padding: '0 24px',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: 'var(--accent)' }}>{commit.repo}</span>
            {' · '}
            {commit.msg}
            {' · '}
            <span style={{ color: 'rgba(212, 160, 176, 0.35)' }}>{commit.time}</span>
            <span style={{ color: 'rgba(212, 160, 176, 0.15)', margin: '0 12px' }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}