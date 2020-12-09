import mongoose,{Document} from 'mongoose';
export interface ICategory extends Document{
    name:string,
    slug:string,
    products:{type:mongoose.Schema.Types.ObjectId,ref:String}[]
}