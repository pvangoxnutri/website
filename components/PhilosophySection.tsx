export default function PhilosophySection() {
  return (
    <section className="w-full px-6 md:px-10 py-20 md:py-28 border-t border-sq-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* ── LEFT: Philosophy ── */}
          <div className="lg:col-span-1">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-sq-muted mb-7">
              The Philosophy
            </p>
            <h2 className="text-[26px] md:text-[30px] font-bold text-sq-dark leading-[1.22] tracking-[-0.02em]">
              A simple way to collect adventures — and make every trip more
              interesting, with hidden quests discovered by fellow travellers.
            </h2>
          </div>

          {/* ── MIDDLE: Organize Ideas ── */}
          <div className="lg:pt-14">
            <div className="w-8 h-px bg-sq-dark mb-7" />
            <h3 className="text-[17px] font-semibold text-sq-dark mb-3 tracking-tight">
              Organize Ideas
            </h3>
            <p className="text-[14px] text-sq-muted leading-[1.75]">
              Clip places, restaurants, and sights into visual boards. Keep
              everything in one beautiful space — organized exactly the way your
              mind works, not someone else&apos;s folder structure.
            </p>
          </div>

          {/* ── RIGHT: Track Your Quests ── */}
          <div className="lg:pt-14">
            <div className="w-8 h-px bg-sq-dark mb-7" />
            <h3 className="text-[17px] font-semibold text-sq-dark mb-3 tracking-tight">
              Track Your Quests
            </h3>
            <p className="text-[14px] text-sq-muted leading-[1.75]">
              Turn every trip into a mini-adventure. Mark locations, unlock
              hidden experiences, and keep a travel journal that grows richer
              with every journey you take.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
