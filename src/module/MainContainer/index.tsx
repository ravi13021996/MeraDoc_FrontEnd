import React from 'react'
import ResponsiveAppBar from './AppBar'
import Components from './Components'
import  PrescriptionMain from '../Prescription_Module/Index'
import {Route,Routes} from "react-router-dom"
import { PRESCRIPTION_PRINT, PRESCRITION_BY_ID, PRESCRITION_LIST } from '../../constant/InternalRoutes'
import AllPrescriptionList from '../Prescription_Module/AllPrescriptionList'
import {Box} from "@mui/material"
import bgPic from "../../images/hostpitalbgImage.webp"
import { Print } from '@mui/icons-material'
import PrintPre from '../Prescription_Module/Print'
export default function index() {


  return (
    <div style={{width:"100%", height:"100%"}}>
        <ResponsiveAppBar/>
        <Box sx={{marginTop:"80px", height:"fit-content"}}>
        <Routes >
        <Route path={'/'} element={<Components ><div style={{backgroundImage:`url(${bgPic})`, backgroundRepeat:"no-repeat", width:"100%", height:"91vh", backgroundSize:"cover"}} ></div></Components>}></Route>
          <Route path={PRESCRITION_LIST} element={<Components ><AllPrescriptionList/></Components>}></Route>
          <Route path={PRESCRITION_BY_ID} element={<Components ><PrescriptionMain/></Components>}></Route>
          <Route path={PRESCRIPTION_PRINT} element={<Components ><PrintPre/></Components>}></Route>
        </Routes>
        </Box>
        
        
    </div>
  )
}
