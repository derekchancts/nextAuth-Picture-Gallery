import Post from "../../../model/postModel"


export default async function handler (req, res) {

  if (req.method === "PUT") 
  {
    // console.log(req.method)
    // console.log(req.query)
    // console.log(req.body)
    const { id } = req.query;

    // console.log(req.body.memoryData)
    if (req.body.memoryData) {
      const { tags, image, message, creater, title } = req.body.memoryData;
    
    
      // FIND POST
      const post = await Post.find({ _id: id })

      if (!post) {
        return res.status(404).send({ error: 'no post found' })
      }

      // if (post) console.log(post)

      try {
        // UPDATE POST
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: id },
          { 
            title,
            message,
            tags,
            creater,
            image,
          },
          {
            new: true,
          }
        )
        // await updatedPost.save()  

        // console.log(updatedPost)

        return res.status(200).json({ success: 'post updated successfully', updatedPost })
      } catch (err) {
        console.log(err)
        return res.status(409).json({ error: err.message })
      }

    }
  } 
  


   if (req.method === "DELETE") {
    // console.log(req.method)
    // console.log(req.user._id.toString())

    const { id } = req.query

    // const post1 = await Post.find({ _id: id })

    // console.log(post1[0]?.userId)

    // if (post1[0].userId !== req.user._id.toString()) {
    //   return res.status(404).send(`invalid user`)
    // }

    // console.log(id)

    try {
      const deletedPost = await Post.findByIdAndDelete({ _id: id })
      // console.log(deletedPost)

      return res.status(200).json({ success: "post deleted", deletedPost })
    } catch (err) {
      return res.status(409).json({ error: err.message })
    }
    
  }

}