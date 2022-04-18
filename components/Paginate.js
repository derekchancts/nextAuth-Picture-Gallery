import { useEffect } from "react"

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { paginatePosts } from "../redux/posts/postActions"
import { useDispatch, useSelector } from "react-redux"



const Paginate = () => {
  const dispatch = useDispatch()

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const postGet = useSelector(state => state.postGet)


  useEffect(() => {
    const number = 1
    dispatch(paginatePosts(number))
  }, [])


  const handleChange = async (number) => {
    if (number === 0) number = 1
    try {
      // console.log(number)  
      // const { data } = await axios.get(`/api/posts/paginate/${number}`)
      dispatch(paginatePosts(number))
      console.log(data)
    } catch (error) {
      console.log(error)  
    }
  };


  return (
    <>
      <Item>Please select page</Item>
      <Paper sx={{ borderRadius: 4, mt: '1rem' }} elevation={6}>
        <Pagination
          color="primary"
          // count={10}
          count={(postGet && Number(postGet?.count)) || 1}
          onChange={e => handleChange(e.target.textContent)}
          renderItem={item => (
            <PaginationItem {...item} />
          )}
        />
      </Paper>
    </>      
  )
}

export default Paginate