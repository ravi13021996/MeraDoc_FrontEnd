import axios from "axios"

export const allBasics={
    post,
    get,
    put,
    deleteApi
}

function post(endPoint:string ,payload:any) {
   return  axios.post(endPoint,payload).then((resItems)=>{
        return resItems
    }).catch((err)=>{
        return err.response
    })
}


function get(endPoint:any) {
    return  axios.get(endPoint).then((resItems)=>{
        return resItems
    }).catch((err)=>{
        return err.response
    })
}

function deleteApi(endPoint:any) {
    return  axios.delete(endPoint).then((resItems)=>{
        return resItems
    }).catch((err)=>{
        return err.response
    })
}

function put(endPoint:string,payload:any) {
    return axios.put(endPoint,payload).then((resItems)=>{
        return resItems
    }).catch((err)=>{
        return err.response
    })
}

