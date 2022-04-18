import Post from "../../../../model/postModel"
import Authenticated from '../../../../middleware/isAuth'


const handler = async (req, res) => {
  if (req.method === "GET") {
    const { page } = req.query
    // console.log(page)
    try {
      const LIMIT = 3   // if "LIMIT = 3", then index will be 0, 3, 6, 9 etc
      const startIndex = (Number(page) - 1) * LIMIT 
      // console.log(startIndex)

      const total = await Post.countDocuments({})   // get the number of posts/documents in our database (that match the filter)
      // console.log(total)

      const posts = await Post.find()
      .sort({ _id: -1 })   // -1 = descending order  (get the latest/most up-to-date ones on top)
      .limit(LIMIT)
      .skip(startIndex)
      // console.log(posts)

      res.status(200).json({ posts, count: Math.ceil(total / LIMIT) })
    } catch (error) {
      console.log(error)
    }
  } 

}

export default handler

