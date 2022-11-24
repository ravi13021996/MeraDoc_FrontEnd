import { Autocomplete, Button, Checkbox, Grid, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { prescriptionConst } from '../../constant/WorkConstant';
import MedicineCompo from './MedicineCompo';
import SimpleTitle from '../../CommonModule.tsx/SimpleTitle';
import axios from "axios"
import ShortUniqueId from "short-unique-id"
import { medicineTemplate } from './model';
import { CommonResObject, simpleModel } from '../../CommonModule.tsx/Models';
import RemarksDialog from '../../CommonModule.tsx/RemarksDialog';
import { prescriptionActions } from '../../actions/prescription';
import { checkIfLessThenZero } from '../../CommonModule.tsx/commonFunctions';
import { useNavigate, useLocation } from "react-router-dom"
import { PRESCRITION_LIST } from '../../constant/InternalRoutes';
import Print_Prescription from './Print_Prescription';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import PrintPre from './Print';
import ErrorCompo from '../../CommonModule.tsx/ErrorCompo';

let medicineSample = {
    id: "5865789",
    name: "",
    dosage: "",
    duration: "",
    quantity: "",
    consumptionTime: "",
    isActive: true


}

function PrescriptionMain() {
    const [consumptionTimeList, setConsumptionTimeList] = useState([])
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [age, setAge] = useState("")
    const [ageError, setAgeError] = useState(false)
    const [gender, setGender] = useState("")
    const [genderError, setGenderError] = useState(false)
    const [complaints, setComplaints] = useState("")
    const [complaintsError, setComplaintsError] = useState(false)
    const [alergyAndDiagnosis, setAlergyAndDiagnosis] = useState("")
    const [alergyAndDiagnosisError, setAlergyAndDiagnosisError] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    const [allMedicine, setAllMedicine] = useState<Array<medicineTemplate> | []>([])
    const [tempMedicine, setTempMedicine] = useState<Array<medicineTemplate> | []>([])
    const [openDialogBoxConfirmations, setOpenDialogBoxConfirmations] = useState(false)
    const [actionBtn, setActionBtn] = useState("add")
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        getConsumptionTime()
        if (location.state) {
            setActionBtn("update")
            prescriptionActions.getById(location.state).then((resItem: any) => {
                console.log(resItem, "resItem")
                if (resItem.status === 200) {
                    setName(resItem.data.patiantName)
                    setAge(resItem.data.patiantAge)
                    setGender(resItem.data.patiantGender)
                    setComplaints(resItem.data.complaints)
                    setAlergyAndDiagnosis(resItem.data.allergiesAndDiagnosis)
                    setTempMedicine(resItem.data.medicineCount)
                } else {

                }
            })
        }
    }, [])


    useEffect(() => {

        //  if user write something on giving feild the error will be vanish
        if (name !== "") {
            setNameError(false)
        }

        if (age !== "") {
            setAgeError(false)
        }
        if (gender !== "") {
            setGenderError(false)
        }
        if (complaints.length > 0) {
            setComplaintsError(false)
        } if (alergyAndDiagnosis.length > 0) {
            setAlergyAndDiagnosisError(false)
        }
    }, [name, age, gender, complaints, alergyAndDiagnosis])








    const getConsumptionTime = () => {
        axios.get('http://localhost:5000/consumption/getAll').then((resItems) => {

            setConsumptionTimeList(resItems.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        //  scroll medicine feild to last for ux
        goToLastScroll()
    }, [allMedicine, tempMedicine])


    const addMedicine = () => {
        
        const uid = new ShortUniqueId({ length: 4 })
        let tempData = { ...medicineSample }
        tempData.id = uid()
        setTempMedicine((prev: Array<medicineTemplate>) => [...prev, { ...tempData }])
    }

    const imageGenerator = () => {
        //  create and image src
        let block = "block"
        var node = document.getElementById('pdfGen');
        if (node) {
            node.style.display = block;
        }
        let premiseResult = new Promise((resolve, reject) => {
            node && htmlToImage.toPng(node)
                .then(function (dataUrl) {
                    var img = new Image();
                    img.src = dataUrl;
                    console.log(dataUrl, "dataUrl")
                    if (node) {
                        node.style.display = "none";
                    }
                    resolve(dataUrl)

                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                    reject("error")
                });
        })

        return premiseResult


    }

    const getHeightOfDiv = () => {
        //  calculate the height of body div
        return (document.body.offsetHeight - 70).toString()
    }

    const goToLastScroll = () => {
        let node = document.getElementById('allMedicine')
        if (node) {
            node.scrollTop = node.scrollHeight
        }
    }

    const datacollectionFunction = (data: any) => {
        // this function collect data from all medicine component
        console.log(data, "data")
        setAllMedicine((prev) => [...prev, data])
    }


    console.log(allMedicine, "allMedicine")
    const saveAndUpdate = () => {
        if (name === "") {
            setNameError(true)
        }
        if (age === "") {
            setAgeError(true)
        }
        if (gender === "") {
            setGenderError(true)
        }
        if (complaints === "") {
            setComplaintsError(true)
        }
        if (alergyAndDiagnosis === "") {
            setAlergyAndDiagnosisError(true)
        }
        else {
            setOpenDialogBoxConfirmations(true)
            setIsFetching(true)
        }
    }

    const fetchRemarkData = () => {
        setActionBtn("add")
        setIsFetching(true)
    }

    const remarkActionFunc = (data: string) => {
        console.log(data, "datadata")

        if (data == "add") {
            // if user click on add button 
            let payload = {
                name: name,
                age: age,
                gender: gender,
                complaints: complaints,
                allergiesAndDiagnosis: alergyAndDiagnosis,
                medicine: allMedicine,
               

            }
            if(allMedicine.length<1){
                alert("please add atleast 1 medicine")
            }else{
                prescriptionActions.save(payload).then((resItem: any) => {

                    if (resItem.status === 200) {
                        navigate(PRESCRITION_LIST)
                    } else {
                        alert(resItem.message)
                    }
                })
            }
            
        }
        else {
            // if user click on other then add button 
            let payload = {
                _id: location.state,
                name: name,
                age: age,
                gender: gender,
                complaints: complaints,
                allergiesAndDiagnosis: alergyAndDiagnosis,
                medicine: allMedicine
            }
            prescriptionActions.update(payload).then((resItem: any) => {
                debugger

                if (resItem.status === 200) {
                    navigate(PRESCRITION_LIST)
                } else {
                    alert(resItem.message)
                }
            })
        }
    }

    return (
        <div style={{ margin: "10px 50px" }} id="pdfGen2">
            <Box sx={{ margin: "10px 0" }}>
                <SimpleTitle title='Patiant Prescription' size='h4' />
            </Box>
            <Paper elevation={3} sx={{ padding: "20px" }}>


                <Grid container>
                    <Grid item md={4}>
                        <Box>
                            <Box sx={{ margin: "10px 0" }}>Patiant Name</Box>
                            <TextField size='small' placeholder="Name" error={nameError} value={name} onChange={(e) => setName(e.target.value)} />
                            <Box sx={{ display: nameError ? "block" : "none", color: "red", marginTop: "5px" }}><ErrorCompo name={"Provide Name"} /></Box>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box>
                            <Box sx={{ margin: "10px 0" }}>Patiant Age</Box>
                            <TextField size='small' type="number" error={ageError} placeholder="age" value={age} onChange={(e) => checkIfLessThenZero(e.target.value) && setAge(e.target.value)} />
                            <Box sx={{ display: ageError ? "block" : "none", color: "red", marginTop: "5px" }}><ErrorCompo name={"Provide Age"} /></Box>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box>
                            <Box sx={{ margin: "10px 0" }}>Patiant Gender</Box>

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size='small'
                                getOptionLabel={(option: simpleModel) => option.name}
                                options={genderList}
                                value={{ id: 0, name: gender }}
                                sx={{ width: 250 }}

                                onChange={(e, value) => value ? setGender(value?.name) : setGender("")}
                                renderInput={(params) => <TextField error={genderError} {...params} placeholder="Gender" />}
                            />
                            <Box sx={{ display: genderError ? "block" : "none", color: "red", marginTop: "5px" }}><ErrorCompo name={"Provide Gender"} /></Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: "20px" }}>
                    <Box sx={{ display: "flex" }}> <Typography> Complaints</Typography>
                        <Tooltip title={prescriptionConst.compalaintinfo}>
                            <IconButton>
                                <InfoIcon fontSize='small' sx={{ cursor: "pointer" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField sx={{ width: "100%" }} placeholder='enter complaints' error={complaintsError} value={complaints} onChange={(e) => setComplaints(e.target.value)} />
                    <Box sx={{ display: complaintsError ? "block" : "none", color: "red", marginTop: "5px" }}><ErrorCompo name={"Provide Complaint"} /></Box>
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                    <Box sx={{ display: "flex" }}> <Typography> Allergies & Diagnosis</Typography>
                        <Tooltip title={prescriptionConst.alergyAndDiagnosisInfo}>
                            <IconButton>
                                <InfoIcon fontSize='small' sx={{ cursor: "pointer" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField sx={{ width: "100%" }} error={alergyAndDiagnosisError} placeholder='enter complaints' value={alergyAndDiagnosis} onChange={(e) => setAlergyAndDiagnosis(e.target.value)} />
                    <Box sx={{ display: alergyAndDiagnosisError ? "block" : "none", color: "red", marginTop: "5px" }}><ErrorCompo name={"Provide Data"} /></Box>
                </Box>

            </Paper>
            <Box id="allMedicine" sx={{ display: tempMedicine.length > 0 ? "block" : "none", scrollBehavior: "smooth", overflow: "scroll", height:" 38vh" }}>
                {
                    tempMedicine?.map((resItems: medicineTemplate, index) =>
                        <MedicineCompo cusumptionType={consumptionTimeList} indiData={resItems} index={index} isFetching={isFetching} datacollectionFunction={datacollectionFunction} isLast={index === allMedicine.length - 1} setIsFetching={setIsFetching} />
                    )
                }
            </Box>




            <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                <Button variant='contained' onClick={addMedicine}> Add Medicine</Button>
                <Box sx={{ display: "flex", justifyContent: "end" }}> <Button variant='contained' onClick={saveAndUpdate} >{actionBtn}</Button>  <Button variant='contained' sx={{ marginLeft: "10px" }} onClick={() => navigate(PRESCRITION_LIST)}>Back</Button></Box>
            </Box>
            <RemarksDialog openDialog={openDialogBoxConfirmations} closeDialog={setOpenDialogBoxConfirmations} buttonData={actionBtn} fetchRemarkData={fetchRemarkData} actionFunction={remarkActionFunc} />

            <div id="pdfGen" style={{ display: "none" }}>
                <PrintPre name={name} age={age} gender={gender} complaints={complaints} alergyAndDiagnosis={alergyAndDiagnosis} medicine={tempMedicine || allMedicine} />
            </div>
        </div>
    )
}

export default PrescriptionMain


let genderList = [
    { id: 1, name: "male" },
    { id: 1, name: "female" },
    { id: 1, name: "other" },
]