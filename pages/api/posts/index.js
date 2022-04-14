import Post from "../../../model/postModel"


export default async function handler (req, res) {
  if (req.method === "GET") {
    try {
      const posts = await Post.find({})

      return res.status(200).json(posts)
    } catch (err) {
      return res.status(404).json({ error: err.message })
    }
  };

  if (req.method === "POST") {
    const post = req.body.memoryData
    // const post = req.body
    // console.log(req.method)
    const newPost = await new Post(post)
    try {
      await newPost.save()

      return res.status(201).json(newPost)
    } catch (err) {
      return res.status(409).json({ error: err.message })
    }
  };
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}