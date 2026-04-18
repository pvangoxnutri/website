import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You're in — SideQuest</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f3f3f3; font-family:Arial, Helvetica, sans-serif; color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f3f3; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
            <tr>
              <td style="padding:0 0 20px 0; font-size:24px; font-weight:800; color:#111111;">
                SideQuest<span style="color:#f48b98;">.</span>
              </td>
            </tr>

            <tr>
              <td style="background-color:#ffffff; border-radius:24px; padding:40px 32px; box-shadow:0 2px 12px rgba(0,0,0,0.04);">
                <div style="font-size:14px; color:#666666; margin-bottom:16px;">You're approved 🎉</div>
                <h1 style="margin:0 0 16px 0; font-size:40px; line-height:1.05; font-weight:800; color:#111111;">
                  Welcome to SideQuest
                </h1>
                <p style="margin:0 0 28px 0; font-size:16px; line-height:1.6; color:#555555;">
                  Your spot on the waitlist has been approved. You're now a member of SideQuest — with lifetime access to every feature we build.
                </p>

                <!-- Member card -->
                <div style="margin:0 0 28px 0; padding:28px 28px 24px 28px; background: linear-gradient(135deg, #111111 0%, #555555 50%, #b0b0b0 100%); border-radius:20px;">
                  <div style="font-size:11px; font-weight:700; letter-spacing:0.15em; color:#888888; text-transform:uppercase; margin-bottom:24px;">SideQuest Member</div>
                  <div style="font-size:30px; font-weight:800; color:#ffffff; margin-bottom:6px; letter-spacing:-0.5px;">Lifetime Access</div>
                  <div style="font-size:13px; color:#dddddd; letter-spacing:0.03em;">All features · Forever</div>
                </div>

                <a href="https://sidequesttravel.app" style="display:inline-block; background-color:#111111; color:#ffffff; text-decoration:none; padding:16px 24px; border-radius:999px; font-size:15px; font-weight:700;">
                  Visit SideQuest
                </a>

                <div style="margin-top:28px; padding:16px 18px; background-color:#f7f7f7; border-radius:16px; font-size:14px; color:#666666;">
                  If you didn't sign up for SideQuest, you can safely ignore this email.
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 4px 0 4px; font-size:12px; line-height:1.6; color:#888888;">
                This email was sent to you because you joined the SideQuest waitlist.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

export async function POST(req: Request) {
  const { email } = await req.json()

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? 'SideQuest <noreply@sidequesttravel.app>',
    to: email,
    subject: "You're in — welcome to SideQuest 🎉",
    html,
  })

  if (error) {
    console.error('Email send failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
