import User from "../../../model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import { sendEmail } from "../../../helpers/sendMail"

import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'


// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)



export default async function handler (req, res) {
  // Run cors
  await cors(req, res)

  // console.log(req.method)

  try {
    if (req.method === "POST") {
      console.log(req.body.dbUser.email)

      const user = await User.findOne({ email: req.body.dbUser.email })

      const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
      })

      console.log(token)

      user.emailToken = token
      await user.save()

      const { origin } = absoluteUrl(req)
      const link = `${origin}/src/user/email/${token}`

      const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`

      // console.log("message", message)

      // console.log("here")

      await sendEmail({
        to: user.email,
        subject: "Email Verification",
        text: message,
      })

      return res.status(200).json({
        success: `Email sent to ${user.email}, please check your email`,
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
}
