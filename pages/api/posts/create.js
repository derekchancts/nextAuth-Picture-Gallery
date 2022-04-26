import Post from "../../../model/postModel"
import Authenticated from "../../../middleware/isAuth"

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



const handler = Authenticated(async (req, res) => { 
  // Run cors
  await cors(req, res)
  
  if (req.method === 'POST') {
    // console.log(req.user)
    if (!req.user) return res.status(404).json({ error: "Please login" })
    
    // const post = req.body.memoryData;
    req.body.memoryData.userId = req.user._id.toString()  // req.user._id is an object. so need to turn it to a string
    const newPost = new Post(req.body.memoryData)
    try {
      await newPost.save()

      // const newPost = await Post.create(req.body.memoryData)  // 2nd method to create post

      return res.status(201).json(newPost)
    } catch (err) {
      return res.status(409).json({ error: err.message })
    }

  }
})


export default handler;



export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}