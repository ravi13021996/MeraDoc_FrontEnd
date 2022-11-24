import { Typography } from '@mui/material'
import { type } from 'os'
import React from 'react'

interface propType{
    title:string,
    size?:'h1'|'h2'|'h3'|'h4'|'h5'|'h6'
}

const SimpleTitle = (props:propType) => {
  return (<>
    {/* <Typography variant='h5' sx={{fontFamily:'Poppins',fontWeight:'500'}}>{props.title}</Typography> */}
    <Typography
    variant={props?.size ?props.size :"h5"}
    className='page_title'
    style={{ 
      fontWeight: '500',
      fontFamily: 'Volkhov',
      textShadow:"2px 2px 2px #ccc"
      // ...styles
    }}
  >
    {props.title}
  </Typography>
  </>
  )
}

export default SimpleTitle