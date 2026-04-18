export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full px-6 md:px-10 py-7 border-t border-sq-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Logo */}
        <div className="flex items-end gap-1">
          <span style={{ fontFamily: 'var(--font-raleway), sans-serif', fontWeight: 900, fontSize: '22px', letterSpacing: '-1.25px', color: '#111111', lineHeight: 1 }}>
            SideQuest
          </span>
          <span style={{ width: '5px', height: '5px', background: '#F4A7B0', borderRadius: '50%', marginLeft: '2px', marginBottom: '2px', display: 'inline-block' }} />
          <span className="text-sq-muted/60 text-[12px] ml-2 mb-[1px]">© {year}</span>
        </div>

        {/* Version badge */}
        <div className="inline-flex items-center gap-1.5 bg-sq-light border border-sq-border rounded-full px-3 py-1.5">
          <span className="w-1 h-1 rounded-full bg-sq-muted-light" />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-sq-muted">
            Version 1.0
          </span>
        </div>
      </div>
    </footer>
  )
}
