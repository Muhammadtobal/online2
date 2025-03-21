import transporter from "../helpers/mailer.js"
export async function sendPayment(email,totalPrice) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: " Your Payments ",
      text: `the count you Payed is ${totalPrice}`,
    })
  }