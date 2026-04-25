import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const html = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>You're in — SideQuest</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
  </head>
  <body style="margin:0; padding:0; background-color:#f3f3f3; font-family:Arial, Helvetica, sans-serif; color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f3f3; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">

            <!-- Logo -->
            <tr>
              <td style="padding:0 0 20px 0; font-size:24px; font-weight:800; color:#111111;">
                SideQuest<span style="color:#D98FAB;">.</span>
              </td>
            </tr>

            <!-- Main card -->
            <tr>
              <td style="background-color:#ffffff; padding:40px 32px;">
                <!--[if mso]><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td style="background-color:#ffffff; padding:40px 32px;"><![endif]-->

                <p style="margin:0 0 16px 0; font-size:14px; color:#666666;">You're approved!</p>
                <h1 style="margin:0 0 16px 0; font-size:36px; line-height:1.1; font-weight:800; color:#111111;">
                  Welcome to SideQuest
                </h1>
                <p style="margin:0 0 28px 0; font-size:16px; line-height:1.6; color:#555555;">
                  Your spot on the waitlist has been approved. You're now a member of SideQuest — with lifetime access to every feature we build.
                </p>

                <!-- Member card — solid background for Outlook compatibility -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 28px 0;">
                  <tr>
                    <td style="background-color:#111111; padding:28px; border-radius:16px;">
                      <p style="margin:0 0 20px 0; font-size:11px; font-weight:700; letter-spacing:0.15em; color:#888888; text-transform:uppercase;">SideQuest Member</p>
                      <p style="margin:0 0 6px 0; font-size:28px; font-weight:800; color:#ffffff; letter-spacing:-0.5px;">Lifetime Access</p>
                      <p style="margin:0; font-size:13px; color:#dddddd; letter-spacing:0.03em;">All features &middot; Forever</p>
                    </td>
                  </tr>
                </table>

                <!-- Button — VML for Outlook rounded corners -->
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://sidequesttravel.app" style="height:52px;v-text-anchor:middle;width:200px;" arcsize="50%" strokecolor="#111111" fillcolor="#111111">
                  <w:anchorlock/>
                  <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:700;">Visit SideQuest</center>
                </v:roundrect>
                <![endif]-->
                <!--[if !mso]><!-->
                <a href="https://sidequesttravel.app" style="display:inline-block; background-color:#111111; color:#ffffff; text-decoration:none; padding:16px 28px; border-radius:999px; font-size:15px; font-weight:700; mso-hide:all;">
                  Visit SideQuest
                </a>
                <!--<![endif]-->

                <!-- Footer note -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td style="padding:16px 18px; background-color:#f7f7f7; border-radius:12px; font-size:14px; color:#666666; line-height:1.5;">
                      If you didn't sign up for SideQuest, you can safely ignore this email.
                    </td>
                  </tr>
                </table>

                <!--[if mso]></td></tr></table><![endif]-->
              </td>
            </tr>

            <!-- Email footer -->
            <tr>
              <td style="padding:18px 4px 0 4px; font-size:12px; line-height:1.6; color:#888888;">
                This email was sent because you joined the SideQuest waitlist.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

const text = `You're approved!

Welcome to SideQuest

Your spot on the waitlist has been approved. You're now a member of SideQuest — with lifetime access to every feature we build.

SideQuest Member — Lifetime Access — All features, forever.

Visit SideQuest: https://sidequesttravel.app

---
This email was sent because you joined the SideQuest waitlist.
If you didn't sign up, you can safely ignore this email.`

export async function POST(req: Request) {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY is not configured.' }, { status: 503 })
  }

  const resend = new Resend(resendApiKey)
  const { email } = await req.json()

  const { error } = await resend.emails.send({
    from: `SideQuest <${process.env.RESEND_FROM ?? 'noreply@sidequesttravel.app'}>`,
    to: email,
    subject: "You're in — welcome to SideQuest",
    html,
    text,
    reply_to: process.env.RESEND_REPLY_TO ?? 'hello@sidequesttravel.app',
  })

  if (error) {
    console.error('Email send failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
