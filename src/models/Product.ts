import mongoose from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number
    },
    categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        }
      ]
}, {  timestamps: true });

export = mongoose.model<IProduct>('Product', productSchema)