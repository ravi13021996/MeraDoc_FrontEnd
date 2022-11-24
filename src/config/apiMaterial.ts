import { ID } from "../CommonModule.tsx/Models"

export const baseUrl="http://localhost:5000"

///// Prescription routes

export const savePrescriptionApiRoute =()=>'/prescription/add'
export const updatePrescriptionApiRoute =()=>'/prescription/update'
export const getAllPrescriptionApiRoute=()=>'/prescription/getAll'
export const getByIdPrescriptionApiRoute=(id:ID)=>`/prescription/getById/${id}`
export const deletePrescriptionApiRoute=(id:ID)=>`/prescription/delete/${id}`

