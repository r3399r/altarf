import { LambdaContext, LambdaEvent } from "./model/Lambda";
import { successOutput } from "./utils/LambdaHelper";

export const api = async(event:LambdaEvent,_context:LambdaContext)=>{
    console.log(event)
    return successOutput('hello world')
}