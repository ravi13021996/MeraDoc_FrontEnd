// This component is a prototype and can be multiple as user want to add medicine in prescription
import { Autocomplete, Button, Checkbox, Grid, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { checkIfLessThenZero } from '../../CommonModule.tsx/commonFunctions'
import { simpleModel } from '../../CommonModule.tsx/Models'
import SimpleTitle from '../../CommonModule.tsx/SimpleTitle'
import { medicineTemplate } from './model'


type propType = {
    cusumptionType: Array<simpleModel>
    indiData: medicineTemplate
    index: number
    datacollectionFunction: (data: any) => void
    isFetching: boolean
    setIsFetching:any
    isLast:boolean
}


export default function MedicineCompo(prop: propType) {
    const [name, setName] = useState(''||prop.indiData.name)
    const [dosage, setdDosage] = useState(0||prop.indiData.dosage)
    const [qty, setQty] = useState(0||prop.indiData.quantity)
    const [duration, setDuration] = useState(0||prop.indiData.duration)
    const [cunsumptionTime, setCunsumptionTime] = useState<simpleModel | null>(null||{id: prop.indiData.consumptionTime,name:prop.indiData.consumptionTimeName?prop.indiData.consumptionTimeName:""})
    const [isActive,setIsActive]=useState(true||prop.indiData.isActive)

    
    useEffect(() => {
        // once user click on add button is fetching will be true and prop.datacollectionFunction funtion will collect the data from medicineComponent
        if (prop.isFetching) {
            let payload = {
                _id: prop.indiData._id,
                name: name,
                dosage: dosage,
                duration: duration,
                quantity: qty,
                consumptionTime: cunsumptionTime,
                isActive: isActive,
            }

            prop.datacollectionFunction(payload)
            if(prop.isLast){
                prop.setIsFetching(false)
            }
        }
    }, [prop.isFetching]) 
    
    return (
        <div>
            <Paper elevation={3} sx={{ marginTop: "20px", padding: "10px" }}>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <SimpleTitle title={`${prop.index + 1} Medicine`} />
                    <Box>
                        <label>Is Active</label>
                    <Checkbox checked={isActive} onChange={(e)=>setIsActive(e.target.checked)}></Checkbox>
                    </Box>
                </Box>
                <Box sx={{ marginTop: "5px" }}>
                    <Box sx={{ margin: "10px 0" }}>Medicine Name</Box>
                    <TextField size="small" value={name} placeholder='Medicine Name' onChange={(e) => setName(e.target.value)} />
                </Box>
                <Grid container sx={{ marginTop: "5px" }}>

                    <Grid item md={6}>
                        <Box>
                            <Box sx={{ margin: "10px 0" }}>Medicine Dosage</Box>
                            <TextField size='small' type="number" placeholder='Dosage' value={dosage} onChange={(e) => setdDosage(e.target.value)} />
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box>
                            <Box sx={{ margin: "10px 0" }}>Medicine Quntity</Box>
                            <TextField size='small' type="number" placeholder='qty' value={qty} onChange={(e) => checkIfLessThenZero(e.target.value) && setQty(parseInt(e.target.value))} />
                        </Box>

                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item md={6}>
                        <Box>
                            <Box sx={{ margin: "10px 0" }}>Medicine Duration</Box>
                            <TextField size='small' type="number" placeholder='Duration' value={duration} onChange={(e) => checkIfLessThenZero(e.target.value) && setDuration(parseInt(e.target.value))} />
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box>
                            <Box sx={{ margin: "10px 0" }}>Comsumption Time</Box>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size='small'
                                getOptionLabel={(option: simpleModel) => option.name}
                                options={prop.cusumptionType}
                                value={cunsumptionTime}
                                onChange={(e, value) => value ? setCunsumptionTime(value) : setCunsumptionTime(null)}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} placeholder="Time" />}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

        </div>

    )
}
