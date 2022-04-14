import { useState, useEffect } from 'react';
import axios from 'axios'
import cookie from 'js-cookie';
import { parseCookies } from "nookies";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router";
// import styles from '../../styles/Toast.module.css'
import Form from '../../../components/form/Form'
import PostCard from "../../../components/posts/PostCard"
import Sort from '../../../helpers/useSort';


import {
  Box,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
// import theme1 from '../../../theme'

import { getPosts } from "../../../redux/posts/postActions"
import { useDispatch, useSelector } from "react-redux"
// import { wrapper } from "../../../redux/store"



// const Dashboard = ({ session }) => {
const Dashboard = () => {
  // const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch()


  // const [postData, setPostData] = useState([]);
  const postGet = useSelector((state) => state.postGet)
  const { loading, error, posts } = postGet
  // console.log({postGet})

  Sort(posts)
  // const sortedPosts = Sort(posts)
  // console.log({sortedPosts})


  // RETRIEVE THE POST (FOR UPDATING)
  const [updatePost, setUpdatePost] = useState("")
  // console.log({updatePost})
  const selectedPost = posts?.filter(post => post._id === updatePost)
  // selectedPost && console.log(selectedPost)
  // selectedPost && console.log(selectedPost[0])
  const postData = selectedPost && selectedPost[0]


  const { data: session, status } = useSession();
  // console.log({session})
  const cookies = parseCookies();
  // const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;
  const user = cookies?.user ? JSON.parse(cookies.user) : "" ;



  useEffect(() => {
    if(!session && !user) {
      router.push("/src/user/login")
    }
  }, []);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const { data } = await axios.get('/api/posts')
  //       console.log(data)
  //       setPostData(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   getPosts();
  // }, []);

  useEffect(() => {
    dispatch(getPosts())
    // setPostData(posts)
    // router.push("/src/user/dashboard")
  }, [])



  if (status !== "authenticated" && !user || loading) {
    // return <h2>Loading...</h2>;
    return (
    <>
      <Box
        sx={{ 
          display: "flex" ,
          width: '95vw' ,
          height: '90vh' ,
          // height: '500px',
          // width: '500px',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: "lightblue"
        }}
      >
        <CircularProgress size={100}/>
      </Box>
    </>
    )
  };


  return (
    <>
      <Grid container maxWidth="lg" sx={{ mt: '1rem' }} >

        {/* <Grid item xs={8} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap'}} component={Card}> */}
        <Grid item xs={8} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap'}}>
          {posts && posts.map(post => (
            <PostCard key={post._id} post={post} setUpdatePost={setUpdatePost} />
          ))}
        </Grid>


        <Grid item xs={4}>
          <Form post={postData} />  
        </Grid>

      </Grid>
    </>
  );

}
 
export default Dashboard;



// export const getServerSideProps = async(context) => {
//   const session = await getSession(context)

//   return {
//     props: {
//       session
//     }
//   }
// }


// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   return {
//     props: {
//       session
//     }
//   }
// }