import nodemailer from 'nodemailer';

export const emailVerification = async (email: string, token: string, name: string) => {
    try {
        const Transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSKEY,
            },
        });
    
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "For verification mail",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f7f7f7;
                        color: #333;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .email-header {
                        text-align: center;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #eeeeee;
                    }
                    .email-header img {
                        max-width: 150px;
                    }
                    .email-body {
                        padding: 20px;
                        text-align: left;
                        line-height: 1.6;
                    }
                    .email-body h1 {
                        color: #333;
                    }
                    .email-body p {
                        margin: 10px 0;
                    }
                    .email-button {
                        display: block;
                        width: 200px;
                        margin: 20px auto;
                        padding: 15px;
                        background-color: #00ED9B;
                        color: white !important; /* Ensure the text color is white */
                        text-align: center;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                    .email-footer {
                        text-align: center;
                        padding-top: 20px;
                        border-top: 1px solid #eeeeee;
                        font-size: 12px;
                        color: #888888;
                    }
                    .email-footer p {
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-body">
                        <h1>Hello, ${name}!</h1>
                        <p>Thank you for signing up with us. Please confirm your email address by clicking the button below:</p>
                        <a 
                        href='${process.env.API_URL}/reg/emailVerification/${token}' 
                        class="email-button" 
                        target="_blank" 
                        style="color: white; text-decoration: none;"
                        >Verify Email Address</a>
                        <p>If you did not create an account with us, please ignore this email.</p>
                    </div>
                    <div class="email-footer">
                        <p>Thank you,</p>
                        <p>weya.ai</p>
                        <p>© 2024 Acme Softech Pvt. Ltd. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        };
    
        const info = await Transporter.sendMail(mailOptions)
        console.log(`Mail send Successfully ${info.response}`);
        return 
    } catch (error) {
        console.log('Mail not sent.', error)
        return { error: { message: 'Mail not sent.' } };
    }
    
};