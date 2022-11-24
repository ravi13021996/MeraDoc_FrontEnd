import { CommonResObject, ID } from "../CommonModule.tsx/Models"
import { baseUrl, deletePrescriptionApiRoute, getAllPrescriptionApiRoute, getByIdPrescriptionApiRoute, savePrescriptionApiRoute, updatePrescriptionApiRoute } from "../config/apiMaterial"
import { allBasics } from "../services/basicServices"

export const prescriptionActions = {
    save,
    update,
    getAll,
    getById,
    deleteFunc
}

async function save(data: any) {
    
    let endPoint = baseUrl + savePrescriptionApiRoute()
    let resObj :CommonResObject= {
        data: [],
        status: 0,
        message: ""
    }   

    return allBasics.post(endPoint, data).then((resItems) => {
        resObj.data = resItems.data.data
        resObj.message = "ok"
        resObj.status = 200
        return resObj
    }).catch((err) => {
        resObj.data = null
        resObj.message = "something went wrong"
        resObj.status = 400
        return resObj
    })
}
async function update(data:any) {
    let endPoint = baseUrl + updatePrescriptionApiRoute()
    let payload = {

    }
    let resObj :CommonResObject= {
        data: [],
        status: 0,
        message: ""

    }

    return allBasics.put(endPoint, data).then((resItems) => {
        resObj.data = resItems.data.data
        resObj.message = "ok"
        resObj.status = 200
        return resObj
    }).catch((err) => {
        resObj.data = null
        resObj.message = "something went wrong"
        resObj.status = 400
        return resObj
    })
}

function getAll() {


    let endPoint = baseUrl + getAllPrescriptionApiRoute()
    let resObj: CommonResObject = {
        message: "",
        data: [],
        status: 0
    }
    return allBasics.get(endPoint).then((resItems: any) => {
        if (resItems.status === 200) {
            resObj.data = resItems.data.data
            resObj.message = "ok"
            resObj.status = 200
            return resObj
        } else {
            resObj.data = null
            resObj.message = "something went wrong"
            resObj.status = 400
            return resObj
        }
    }).catch((err) => {
        resObj.data = null
        resObj.message = "something went wrong"
        resObj.status = 400
        return resObj
    })
}

function getById(id:ID){
    let endPoint=baseUrl+getByIdPrescriptionApiRoute(id)

    let resObj: CommonResObject = {
        message: "",
        data: [],
        status: 0
    }
    return allBasics.get(endPoint).then((resItems: any) => {
        if (resItems.status === 200) {
            resObj.data = resItems.data.data
            resObj.message = "ok"
            resObj.status = 200
            return resObj
        } else {
            resObj.data = null
            resObj.message = "something went wrong"
            resObj.status = 400
            return resObj
        }
    }).catch((err) => {
        resObj.data = null
        resObj.message = "something went wrong"
        resObj.status = 400
        return resObj
    })
}

function deleteFunc(id:ID){
    let endPoint=baseUrl+deletePrescriptionApiRoute(id)

    let resObj: CommonResObject = {
        message: "",
        data: [],
        status: 0
    }
    return allBasics.deleteApi(endPoint).then((resItems: any) => {
        if (resItems.status === 200) {
            resObj.data = resItems.data.data
            resObj.message = "ok"
            resObj.status = 200
            return resObj
        } else {
            resObj.data = null
            resObj.message = "something went wrong"
            resObj.status = 400
            return resObj
        }
    }).catch((err) => {
        resObj.data = null
        resObj.message = "something went wrong"
        resObj.status = 400
        return resObj
    })
}