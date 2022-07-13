import nodemailer from "nodemailer"

interface Email {
    email: string | string[]
    subject: string
    text: string
}

const sendEmail = async ({email, subject, text}: Email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text
        })
    } catch (err: any) {
        
    }
}

export default sendEmail
