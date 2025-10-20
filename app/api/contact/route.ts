import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/zeptomail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        message,
        status: 'new',
      },
    });

    console.log('Contact form submission saved:', {
      id: submission.id,
      name,
      email,
      company,
    });

    // Send email notification to sales team
    try {
      const baseUrl = process.env.NEXTAUTH_URL || 'https://orba.work';
      await sendEmail({
        from: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@orba.work',
        to: process.env.SALES_EMAIL || 'sales@orba.work',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="color-scheme" content="light">
              <meta name="supported-color-schemes" content="light">
            </head>
            <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; padding: 48px 16px;">
                <tr>
                  <td align="center">
                    <!-- Main Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;">
                      
                      <!-- Header -->
                      <tr>
                        <td style="padding: 48px 48px 32px 48px;">
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="center" style="padding-bottom: 24px;">
                                <img src="${baseUrl}/logo-dark.svg" alt="Orba" style="height: 32px; display: block;">
                              </td>
                            </tr>
                            <tr>
                              <td style="border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.025em;">New Contact Submission</h1>
                                <p style="margin: 8px 0 0 0; font-size: 14px; color: #737373; line-height: 1.5;">Someone has reached out through the contact form</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 0 48px 48px 48px;">
                          <!-- Contact Card -->
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 24px;">
                            <tr>
                              <td style="padding: 20px;">
                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="padding-bottom: 16px;">
                                      <p style="margin: 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">NAME</p>
                                      <p style="margin: 6px 0 0 0; font-size: 14px; font-weight: 500; color: #0a0a0a;">${name}</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding-bottom: 16px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                                      <p style="margin: 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">EMAIL</p>
                                      <p style="margin: 6px 0 0 0; font-size: 14px; font-weight: 500;"><a href="mailto:${email}" style="color: #0a0a0a; text-decoration: underline; text-decoration-color: #e5e7eb;">${email}</a></p>
                                    </td>
                                  </tr>
                                  ${company ? `
                                  <tr>
                                    <td style="padding-bottom: 16px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                                      <p style="margin: 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">COMPANY</p>
                                      <p style="margin: 6px 0 0 0; font-size: 14px; font-weight: 500; color: #0a0a0a;">${company}</p>
                                    </td>
                                  </tr>
                                  ` : ''}
                                  <tr>
                                    <td style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
                                      <p style="margin: 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">MESSAGE</p>
                                      <p style="margin: 12px 0 0 0; font-size: 14px; color: #0a0a0a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Alert -->
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fef9c3; border: 1px solid #fde047; border-radius: 6px;">
                            <tr>
                              <td style="padding: 16px;">
                                <p style="margin: 0; font-size: 13px; color: #854d0e; line-height: 1.5;">
                                  <strong style="font-weight: 600;">Response required:</strong> Please respond within 24 hours to maintain our service commitment.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #fafafa; padding: 32px 48px; border-top: 1px solid #e5e7eb;">
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <p style="margin: 0 0 4px 0; font-size: 12px; color: #a3a3a3; line-height: 1.5;">
                                  <strong style="color: #737373;">Submission ID:</strong> ${submission.id}
                                </p>
                                <p style="margin: 0; font-size: 12px; color: #a3a3a3; line-height: 1.5;">
                                  <strong style="color: #737373;">Received:</strong> ${submission.createdAt.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 20px;">
                                <p style="margin: 0; font-size: 11px; color: #a3a3a3;">
                                  © ${new Date().getFullYear()} Orba. All rights reserved.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
      console.log('Sales notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send sales notification email:', emailError);
      // Don't fail the request if email fails - submission is already saved
    }

    // Send confirmation email to the user
    try {
      const baseUrl = process.env.NEXTAUTH_URL || 'https://orba.work';
      await sendEmail({
        from: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@orba.work',
        to: email,
        subject: 'Thank you for contacting Orba',
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="color-scheme" content="light">
              <meta name="supported-color-schemes" content="light">
            </head>
            <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; padding: 48px 16px;">
                <tr>
                  <td align="center">
                    <!-- Main Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;">
                      
                      <!-- Header -->
                      <tr>
                        <td style="padding: 48px 48px 32px 48px;">
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="center" style="padding-bottom: 24px;">
                                <img src="${baseUrl}/logo-dark.svg" alt="Orba" style="height: 32px; display: block;">
                              </td>
                            </tr>
                            <tr>
                              <td style="border-bottom: 1px solid #e5e7eb; padding-bottom: 24px;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.025em;">Thank you for reaching out</h1>
                                <p style="margin: 8px 0 0 0; font-size: 14px; color: #737373; line-height: 1.5;">We've received your message and will respond shortly</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 0 48px 48px 48px;">
                          <p style="margin: 0 0 20px 0; font-size: 14px; color: #0a0a0a; line-height: 1.6;">
                            Hi <strong>${name}</strong>,
                          </p>
                          
                          <p style="margin: 0 0 24px 0; font-size: 14px; color: #525252; line-height: 1.6;">
                            Thank you for contacting Orba. We've successfully received your message and our team is already reviewing it. We'll get back to you within <strong style="color: #0a0a0a;">24 hours</strong>.
                          </p>
                          
                          <!-- Message Card -->
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 24px;">
                            <tr>
                              <td style="padding: 20px;">
                                <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 500; color: #737373; letter-spacing: 0.025em;">YOUR MESSAGE</p>
                                <p style="margin: 0; font-size: 14px; color: #0a0a0a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Features Grid -->
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 24px;">
                            <tr>
                              <td style="padding-bottom: 16px;">
                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="vertical-align: top; padding-right: 12px; width: 20px;">
                                      <div style="width: 6px; height: 6px; background-color: #0a0a0a; border-radius: 50%; margin-top: 6px;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                      <p style="margin: 0; font-size: 13px; font-weight: 500; color: #0a0a0a;">Quick Response</p>
                                      <p style="margin: 4px 0 0 0; font-size: 13px; color: #737373; line-height: 1.5;">Typically within a few hours during business hours</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 16px;">
                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="vertical-align: top; padding-right: 12px; width: 20px;">
                                      <div style="width: 6px; height: 6px; background-color: #0a0a0a; border-radius: 50%; margin-top: 6px;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                      <p style="margin: 0; font-size: 13px; font-weight: 500; color: #0a0a0a;">Expert Support</p>
                                      <p style="margin: 4px 0 0 0; font-size: 13px; color: #737373; line-height: 1.5;">Personalized assistance from our dedicated team</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="vertical-align: top; padding-right: 12px; width: 20px;">
                                      <div style="width: 6px; height: 6px; background-color: #0a0a0a; border-radius: 50%; margin-top: 6px;"></div>
                                    </td>
                                    <td style="vertical-align: top;">
                                      <p style="margin: 0; font-size: 13px; font-weight: 500; color: #0a0a0a;">Tailored Solutions</p>
                                      <p style="margin: 4px 0 0 0; font-size: 13px; color: #737373; line-height: 1.5;">Solutions that match your specific needs</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- CTA Button -->
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin: 32px 0 24px 0;">
                            <tr>
                              <td align="center">
                                <a href="${baseUrl}/dashboard" style="display: inline-block; background-color: #0a0a0a; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; font-size: 13px; transition: background-color 0.2s;">
                                  Visit Dashboard
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 24px 0 0 0; font-size: 13px; color: #737373; line-height: 1.6; text-align: center;">
                            In the meantime, explore more at <a href="${baseUrl}" style="color: #0a0a0a; text-decoration: underline; text-decoration-color: #e5e7eb;">orba.work</a>
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #fafafa; padding: 32px 48px; border-top: 1px solid #e5e7eb;">
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <p style="margin: 0 0 16px 0; font-size: 13px; color: #0a0a0a; line-height: 1.5;">
                                  Best regards,<br>
                                  <strong>The Orba Team</strong>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0 0 8px 0; font-size: 11px; color: #a3a3a3; line-height: 1.5;">
                                  This is an automated confirmation email. For immediate assistance, please visit our website or contact our support team.
                                </p>
                                <p style="margin: 0; font-size: 11px; color: #a3a3a3;">
                                  © ${new Date().getFullYear()} Orba. All rights reserved.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
      console.log('Confirmation email sent successfully to user');
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for contacting us! We will get back to you soon.',
        submissionId: submission.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

