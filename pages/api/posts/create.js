import Post from "../../../model/postModel"
import Authenticated from "../../../middleware/isAuth"


const handler = Authenticated(async (req, res) => { 
  
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