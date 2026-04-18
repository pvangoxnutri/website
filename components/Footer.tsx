export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full px-6 md:px-10 py-7 border-t border-sq-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-sq-dark flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7L5.5 10.5L12 4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sq-dark font-semibold text-[14px] tracking-tight">
            SideQuest
          </span>
          <span className="text-sq-muted/60 text-[12px] ml-1">
            © {year}
          </span>
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
