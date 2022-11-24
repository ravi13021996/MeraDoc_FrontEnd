import { Box } from '@mui/material'
import React from 'react'
type proptype ={
name:string
}
export default function ErrorCompo(prop:proptype) {
  return (
    <div>
        <Box sx={{  color:"red" }}>{prop.name}</Box>
    </div>
  )
}
