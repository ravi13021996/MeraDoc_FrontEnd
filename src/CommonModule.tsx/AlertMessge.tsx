import { Alert, Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar } from '@mui/material'
import React from 'react'

type propType = {
    status: 400 | 200|0,
    message: string
}
export default function AlertMessge(prop: propType) {

    const handleClose = () => {

    }
    if (prop.status === 400) {
        return (
            <div>

                <Dialog onClose={handleClose} open={true}>
                    <DialogTitle>Set backup account</DialogTitle>


                    Hii Dialog box
                </Dialog>


            </div>
        )
    }
    if (prop.status === 200) {
        return (
            <div style={{display:prop.status === 200?"block":"none"}}>

                <Alert severity="success">This is a success message!</Alert>

            </div>
        )
    }
    else{
        return(<div></div>)
    }

}
