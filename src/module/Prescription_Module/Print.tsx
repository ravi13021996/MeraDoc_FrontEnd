import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { prescriptionActions } from '../../actions/prescription'
import { ID } from '../../CommonModule.tsx/Models'
import { medicineTemplate } from './model'
import ReactToPrint from 'react-to-print'
import logo from "../../images/logo.png"
import './style2.css'
import { PRESCRITION_LIST } from '../../constant/InternalRoutes'
type propType = {
    name?: string
    age?: ID
    gender?: string
    complaints?: string
    alergyAndDiagnosis?: string
    medicine?: Array<medicineTemplate>


}
export default function PrintPre(prop: propType) {
    const [consumptionTimeList, setConsumptionTimeList] = useState([])
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [complaints, setComplaints] = useState("")
    const [alergyAndDiagnosis, setAlergyAndDiagnosis] = useState("")
    const [tempMedicine, setTempMedicine] = useState<Array<medicineTemplate> | []>([])
    const [date,setDate]=useState("")
    const location = useLocation()
    const componentRef = useRef()
    const navigate=useNavigate()

    useEffect(() => {
        prescriptionActions.getById(location.state).then((resItem: any) => {
            console.log(resItem, "resItem")
            if (resItem.status === 200) {
                setName(resItem.data.patiantName)
                setAge(resItem.data.patiantAge)
                setGender(resItem.data.patiantGender)
                setComplaints(resItem.data.complaints)
                setAlergyAndDiagnosis(resItem.data.allergiesAndDiagnosis)
                setTempMedicine(resItem.data.medicineCount)
                setDate(resItem.data.createdAt)
            } else {

            }
        })

    }, [])


    const printModuel = () => {
        let iframe = document.getElementById("testId")


    }
    console.log(date,"createdAt")
    return (
        <div id="indiPrint" style={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ReactToPrint
                trigger={() => <Button variant='contained' sx={{ marginTop: "20px" }} onClick={() => { printModuel() }}>Print</Button>}
                content={() => componentRef.current ? componentRef.current : null}
            />
            <Box id="testId" sx={{ marginTop: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} ref={componentRef}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} height="50px" width="50px"></img>
                    <Typography variant='h5'> MeraDoc</Typography>
                </Box>
                <table style={{ border: "1px solid", width: "500px" }}>
                    <thead >
                        <th className='tdtrStyle' colSpan={2}>Patiant Detail</th>
                    </thead>
                    <tbody >
                        <tr className='tdtrStyle'>
                            <td className='tdtrStyle'>Patiant Name</td>
                            <td className='tdtrStyle'>{name}</td>
                        </tr>


                        <tr className='tdtrStyle'>
                            <td className='tdtrStyle'>Patiant age</td>
                            <td className='tdtrStyle'>{age}</td>
                        </tr>


                        <tr className='tdtrStyle'>
                            <td className='tdtrStyle'>Patiant gender</td>
                            <td className='tdtrStyle'>{gender}</td>
                        </tr>

                        <tr className='tdtrStyle'>
                            <td className='tdtrStyle'>Complaints</td>
                            <td className='tdtrStyle'>{complaints}</td>
                        </tr>

                        <tr >
                            <td className='tdtrStyle'>AlergyAndDiagnosis</td>
                            <td className='tdtrStyle'>{alergyAndDiagnosis}</td>
                        </tr>

                    </tbody>
                </table>


                {tempMedicine?.map((resItem: medicineTemplate, index: number) => {
                    return <table style={{ border: "1px solid", marginTop: "20px", width: "500px" }}>
                        <thead >
                            <th colSpan={2}>Medicine Detail {index + 1}</th>
                        </thead>
                        <tbody style={{ margin: "10px" }}>


                            <tr className='tdtrStyle'>
                                <td className='tdtrStyle'> Name</td>
                                <td className='tdtrStyle'> {resItem.name}</td>
                            </tr>
                            <tr className='tdtrStyle'>
                                <td className='tdtrStyle'> Dosage</td>
                                <td className='tdtrStyle'> {resItem.dosage}</td>
                            </tr>
                            <tr className='tdtrStyle'>
                                <td className='tdtrStyle'> Quantity</td>
                                <td className='tdtrStyle'> {resItem.dosage}</td>
                            </tr>
                            <tr className='tdtrStyle'>
                                <td className='tdtrStyle'> Duration</td>
                                <td className='tdtrStyle'> {resItem.duration}</td>
                            </tr>
                            <tr className='tdtrStyle'>
                                <td className='tdtrStyle'> Consumption Time</td>
                                <td className='tdtrStyle'> {resItem.consumptionTimeName}</td>
                            </tr>

                        </tbody></table>
                })}
            </Box>
            <Button variant='contained' sx={{ marginTop: "20px" }} onClick={() => {navigate(PRESCRITION_LIST) }}>Back</Button>

            {/* 

            {tempMedicine?.map((resItem: medicineTemplate, index: number) => {
                return <Box>
                    <h4> Medicine{index + 1}</h4>
                    <Box sx={{ marginLeft: "20px" }}>
                        <Box sx={{ marginTop: "10px" }}>
                            <span> Name</span>:
                            <span> {resItem.name}</span>
                        </Box>
                        <Box sx={{ marginTop: "10px" }}>
                            <span> Dosage</span>:
                            <span> {resItem.dosage}</span>
                        </Box>
                        <Box sx={{ marginTop: "10px" }}>
                            <span> Quantity</span>
                            <span> {resItem.dosage}</span>
                        </Box>
                        <Box sx={{ marginTop: "10px" }}>
                            <span> Duration</span>:
                            <span> {resItem.duration}</span>
                        </Box>
                        <Box sx={{ marginTop: "10px" }}>
                            <span> Consumption Time</span>:
                            <span> {resItem.consumptionTimeName}</span>
                        </Box>
                    </Box>
                </Box>
            })} */}

        </div>
    )
}
