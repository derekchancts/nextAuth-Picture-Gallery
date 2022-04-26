import User from "../../../model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
  await cors(req, res)

  const { email, update } = req.body

  console.log(req.body)

  try {
    if (req.method === "PUT") {
      const user = await User.findOne({ email })

      user.update = update

      const updatedUser = await user.save()

      return res.status(200).json({ message: updatedUser })
    } else {
      return res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
  }
}
