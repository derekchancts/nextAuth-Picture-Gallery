import User from '../../../model/userModel'
import bcrypt from 'bcryptjs'
import { handleErrors } from '../../../utils/HandleErrors'
const jwt = require('jsonwebtoken')

// import connectDB from "../../lib/connectDB"
// connectDB();

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
  
  // console.log(req.method)
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // console.log(email, password)

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(422).json({ error: "User does not exist" })
      } 

      if (user) {
        if (!password || password === "undefined") {
          return res.status(422).json({ error: "Please enter password" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(422).json({ error: "Password not correct" })
        }

        // const token = jwt.sign({ userid: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' } )
        const token = jwt.sign({ userId: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' } )
        // const token = jwt.sign({ userid: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME } )  // "seconds"

        // send this cookie named "jwt" back to the client
        // res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.COOKIE_ACCESS_TIME });  // maxAge in milliseconds

        const { email, _id, name } = user

        return res.status(201).json({ success: 'Login success', user: { email, _id, name }, token })
      }
        
    } catch (error) {
      // console.log(error)
      // const errors = handleErrors(error);
      // console.log(errors)
      return res.status(400).json({ error })
    }
  }
};