import { ID } from "../../CommonModule.tsx/Models"

export type medicineTemplate={
    _id?:ID,
    name:string,
    dosage:ID,    
    duration:ID,
    quantity:ID,
    consumptionTime:string,
    consumptionTimeName?:string |undefined
    isActive:boolean


}