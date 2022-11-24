// This component is for common share where Remarks need to take, 
// it takes 3 arguments openDialog, to open remarks dialog, closeDialog(for close the remarks dialog), buttonData(data of button ,which action to be taken after clicking the buttn )

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
type PropType = {
    openDialog: boolean
    closeDialog: React.Dispatch<React.SetStateAction<boolean>>
    buttonData?: any
    fetchRemarkData: (data: any) => void
    actionFunction?: (data: any) => void
}
export default function RemarksDialog(props: PropType) {

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        props?.closeDialog(false)
    }

    const handleAction = () => {

    }

    return (
        <div>

            <Dialog
                open={props?.openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': { borderRadius: "16px" } }}
            >

                <DialogTitle id="alert-dialog-title"  sx={{backgroundColor: 'primary.main',color: 'secondary.main'}}>
                    <Box style={{ display: 'flex', justifyContent: "space-between" }}>
                        {props.buttonData?.name}
                        <ClearIcon onClick={() => props?.closeDialog(false)} sx={{ fontSize: "30px", cursor: "pointer", margin: "auto 0" }} />
                    </Box>
                </DialogTitle>
                <Divider />


                <DialogContent >

                    <Box style={{ color: "grey" }}> Are you sure you want to {props?.buttonData}</Box>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="Enter Comment"
                        onChange={(e: any) => props.fetchRemarkData(e.target.value)}
                        style={{ width: "500px", marginTop: "15px", marginBottom: "0", outline: "none", padding: "8px", borderRadius: "8px", border: "1px solid FCFCFC" }}
                    />
                    {/* <TextField label="Enter Comment" sx={{ width: "500px", margin: "20px 0" }} /> */}
                </DialogContent>

                <DialogActions>
                    <Button style={{ color: "red" }} onClick={handleClose}>Disagree</Button>
                    <Button onClick={() => props.actionFunction && props.actionFunction(props.buttonData ? props.buttonData : "other Then cancel")} style={{ color: "green" }} autoFocus >
                        {props?.buttonData}
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}
