export function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundColor: '#080808',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
      aria-hidden="true"
    />
  )
}
