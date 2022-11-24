import { Button } from '@mui/material'
import React from 'react'
import ReactToPrint from 'react-to-print'

export default function Print_Prescription() {
        return (
        <div>
            

            <table>
                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Rollno</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Ravi</td>
                        <td>12th</td>
                        <td>101</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
