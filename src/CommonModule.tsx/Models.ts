export type ID = string |number
export type simpleModel={
    name:string,
    id:ID
}

export type CommonResObject={
    message:string
    data:Array<any>|null
    status:number
}