//  This module is to show the list of all prescription available

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import Search from '../../CommonModule.tsx/Search';
import { useNavigate } from "react-router-dom"
import { PRESCRIPTION_PRINT, PRESCRITION_BY_ID } from '../../constant/InternalRoutes';
import { prescriptionActions } from '../../actions/prescription';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleTitle from '../../CommonModule.tsx/SimpleTitle';
import Print_Prescription from './Print_Prescription';
import ReactToPrint from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { CommonResObject, ID } from '../../CommonModule.tsx/Models';
import RemarksDialog from '../../CommonModule.tsx/RemarksDialog';
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];



export default function AllPrescriptionList() {
    const [prescriptionListData, setPrescriptionListData] = React.useState<any>(null)
    const [openDialogBoxConfirmations, setOpenDialogBoxConfirmations] = React.useState(false)
    const [actionBtn, setActionBtn] = React.useState("delete")
    const [actionId,setActionId]=React.useState<ID>("")
    const navigate = useNavigate()


    React.useEffect(() => {
        fetchList()
    }, [])

const fetchList=()=>{
    prescriptionActions.getAll().then((resItem) => {
        console.log(resItem, "resItem")
        if (resItem.status === 200) {
            setPrescriptionListData(resItem.data)
        } else {
            alert(resItem.message)
        }
    })
    }
    console.log(prescriptionListData, "prescriptionListData")
    const deletehandle = (id: ID) => {
        setOpenDialogBoxConfirmations(true)
        setActionId(id )
        
    }

    const fetchRemarkData = () => {

    }
    const remarkActionFunc = (data: any) => {
        console.log(data, "data")

        if (data === "delete") {
            prescriptionActions.deleteFunc(actionId).then((resItem:CommonResObject)=>{
                if(resItem.status===200){
                alert('succesfully deleted')
                setOpenDialogBoxConfirmations(false)
                fetchList()
                }else{
    
                }
            })
        }
    }
    return (

        <Box sx={{ margin: "50px" }}>
            <Box sx={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
                <Button variant='contained' onClick={() => navigate(PRESCRITION_BY_ID)}>Add Prescription</Button>
            </Box>
            {/* <ReactToPrint
                  trigger={() => <Button variant="contained"
                    color="primary" style={{position:'fixed'}} >Print</Button>}
                  content={() => <Print_Prescription/>}
                  copyStyles={true}
                /> */}

            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <SimpleTitle title='Prescription Table' size='h5' />
                <Search handleSearch={(e: any) => console.log(e)} />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Sr No</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Medicine Count</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {prescriptionListData && prescriptionListData.length > 0 ? prescriptionListData.map((row: any, index: number) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center" sx={{ cursor: "pointer" }} onClick={() => navigate(PRESCRITION_BY_ID, { state: row._id })}>{row.patiantName}</TableCell>
                                <TableCell align="center">{row.patiantAge}</TableCell>
                                <TableCell align="center">{row.patiantGender}</TableCell>
                                <TableCell align="center">{row.medicineCount}</TableCell>
                                <TableCell align="center"><VisibilityIcon sx={{ cursor: "pointer" }} onClick={() => navigate(PRESCRITION_BY_ID, { state: row._id })} /> <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => deletehandle(row._id)} /><PrintIcon sx={{ cursor: "pointer" }} onClick={() => navigate(PRESCRIPTION_PRINT, { state: row._id })} /> </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell colSpan={6} align="center" >No Data Available</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>

            <RemarksDialog openDialog={openDialogBoxConfirmations} closeDialog={setOpenDialogBoxConfirmations} buttonData={actionBtn} fetchRemarkData={fetchRemarkData} actionFunction={remarkActionFunc} />
        </Box>
    );
}