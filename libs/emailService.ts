import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string, 
  verificationToken: string, 
  name: string
) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify Your Email - Thesis Archive Management System",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="background-color: #dc2626; color: white; width: 60px; height: 60px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h1 style="color: #1f2937; margin: 0;">Verify Your Email</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <p style="margin: 0 0 15px 0; color: #374151;">Hello ${name},</p>
          <p style="margin: 0 0 15px 0; color: #374151;">
            Thank you for registering with the Thesis Archive Management System. 
            To complete your registration, please verify your email address by clicking the button below.
          </p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            After email verification, an administrator will review and approve your account.
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="margin: 0; color: #3b82f6; font-size: 14px; word-break: break-all;">
            ${verificationUrl}
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">
            This email was sent by the Thesis Archive Management System. 
            If you didn't create an account, please ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendUserStatusNotification(
  email: string,
  name: string,
  status: "approved" | "rejected",
  rejectionReason?: string
) {
  const isApproved = status === "approved";
  const subject = isApproved 
    ? "Account Approved - Thesis Archive Management System"
    : "Account Registration Update - Thesis Archive Management System";

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="background-color: ${isApproved ? '#16a34a' : '#dc2626'}; color: white; width: 60px; height: 60px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              ${isApproved 
                ? '<path d="M5 13l4 4L19 7"/>'
                : '<path d="M6 18L18 6M6 6l12 12"/>'
              }
            </svg>
          </div>
          <h1 style="color: #1f2937; margin: 0;">
            Account ${isApproved ? 'Approved' : 'Registration Update'}
          </h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <p style="margin: 0 0 15px 0; color: #374151;">Hello ${name},</p>
          ${isApproved 
            ? `
              <p style="margin: 0 0 15px 0; color: #374151;">
                Congratulations! Your account has been approved by an administrator. 
                You can now log in and access the Thesis Archive Management System.
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${process.env.NEXTAUTH_URL}/login" 
                   style="background-color: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                  Log In Now
                </a>
              </div>
            `
            : `
              <p style="margin: 0 0 15px 0; color: #374151;">
                We regret to inform you that your account registration has been rejected.
              </p>
              ${rejectionReason ? `
                <div style="background-color: #fee2e2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <p style="margin: 0; color: #991b1b; font-weight: 500;">Reason for rejection:</p>
                  <p style="margin: 5px 0 0 0; color: #7f1d1d;">${rejectionReason}</p>
                </div>
              ` : ''}
              <p style="margin: 15px 0 0 0; color: #374151;">
                If you believe this was an error or would like to reapply, please contact the system administrator.
              </p>
            `
          }
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">
            This email was sent by the Thesis Archive Management System.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}