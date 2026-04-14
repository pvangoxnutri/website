export default function ContactSection() {
  return (
    <section className="w-full px-6 md:px-10 py-16 md:py-20 border-t border-sq-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

        {/* ── LEFT ── */}
        <div>
          <h3 className="text-[24px] font-bold text-sq-dark tracking-tight mb-3">
            Questions?
          </h3>
          <p className="text-[14px] text-sq-muted leading-[1.75] max-w-[360px]">
            SideQuest is in active development. Reach out if you&apos;re
            interested in early testing, have feature ideas, or just want to say
            hello — we&apos;d love to hear from you.
          </p>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-sq-muted mb-3">
            General Inquiries
          </p>
          <a
            href="mailto:hello@sidequest.app"
            className="text-[20px] font-semibold text-sq-dark hover:text-sq-muted transition-colors duration-150 tracking-tight"
          >
            hello@sidequest.app
          </a>
        </div>
      </div>
    </section>
  )
}
