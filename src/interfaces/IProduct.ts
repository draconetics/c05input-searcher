import mongoose,{Document} from 'mongoose';
export interface IProduct extends Document{
    name:string,
    price:string,
    categories:{type:mongoose.Schema.Types.ObjectId,ref:String}[]
}