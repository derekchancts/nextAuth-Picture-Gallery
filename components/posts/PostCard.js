import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Card, CardActions, CardContent, CardMedia 
} from "@mui/material";

import { postDelete } from "../../redux/posts/postActions"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { toast } from "react-toastify";
import { useRouter } from "next/router";



const PostCard = ({ post, setUpdatePost }) => {
  const router = useRouter();

  const dispatch = useDispatch()
  const deleteAPost = useSelector((state) => state.deleteAPost)


  const deletePost = async (id) => {
    let answer = window.confirm("Are you sure you want to delete")
    if (!answer) {
      return
    }
    dispatch(postDelete(id))
    toast.error("post deleted")
    // router.push('/src/user/profile');  // NEED TO UPDATE THIS TO ROUTER.RELOAD() AFTER REDUX IS UPDATED
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }

    // try {
    //   const { data } = await axios.delete(`/api/posts/${id}` )
    //   console.log({data})

    //   if (data.error) {
    //     console.log({error: data.error})
    //     toast.error(data.error + " 🤯")
    //   }

    //   if (data && !data.error) { 
    //     toast.success(data.success + " 🚀")
    //     router.push('/src/user/profile');    // NEED TO UPDATE THIS TO ROUTER.RELOAD() AFTER REDUX IS UPDATED
    //   }
      
    // } catch (error) {
    //   console.log(error)
    // }
  };


  return (
    <>
    <Card sx={{ maxWidth: 230, maxHeight: 370, ml: '1rem', my: '1rem' }} >
      <CardMedia
        component="img"
        height="140"
        image={post?.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post?.title}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {post?.creater}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: '1rem' }}>
          {post?.message.length > 60 ? post?.message.substring(0, 60) + '...' : post?.message }
        </Typography>
      
        <Typography variant="body2" color="text.secondary" sx={{ mt: '1rem' }}>
          {post?.tags.map(tag => tag.length > 22 ? `${tag.substring(0, 22)} + ...` : post?.tags )}
        </Typography>
      </CardContent>

      <CardActions sx={{ mt: '-1rem' }}>
        <Button size="small" sx={{ mr: "2rem", minWidth: '0px' }} >Like</Button>
        <Button size="small" onClick={() => deletePost(post._id)} sx={{ mr: "-0.5rem" }} >Delete</Button>
        <Button size="small" onClick={() => setUpdatePost(post._id)} >Update</Button>
      </CardActions>

    </Card>
  </>
  )
}

export default PostCard