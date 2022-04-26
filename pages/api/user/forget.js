import User from "../../../model/userModel"
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import { sendEmail } from "../../../helpers/sendMail"
import { sendGrid } from '../../../helpers/sendGrid'

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


export default async function handler(req, res) {
  await cors(req, res)
  // console.log(req.body)

  try {
    if (req.method === "POST") {
      const { email } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ error: "email not found" })
      }
      // console.log(user)

      // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: "30d",})
      // const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME } )
      const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'  } )

      // console.log(token)

      user.resetToken = token
      await user.save()

      const { origin } = absoluteUrl(req)
      const link = `${origin}/src/user/reset/${token}`

      const message = `<div>Click on the link below to reset your password, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`

      // console.log("message", message)

      // console.log("here")

      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      })

      // NEED TO WRITE SOME LOGIC HERE FOR ERROR HANDLING IF ERROR DURING SENDING EMAIL

      return res.status(200).json({
        success: `Email sent to ${user.email}, please check your email`,
      })
  
      // if (result) {
      //   return res.status(200).json({
      //     message: `Email sent to ${user.email}, please check your email`,
      //   })
      // } else {
      //   return res.status(404).json({ error: "error while trying to send email" })
      // }
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
}
