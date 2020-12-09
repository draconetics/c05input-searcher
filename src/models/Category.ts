import mongoose from "mongoose";
import { HttpException } from "../common/HttpException";
import { ICategory } from "../interfaces/ICategory";
const mongoosastic = require('mongoosastic');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String
    },
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      ]
}, {  timestamps: true });

export = mongoose.model<ICategory>('Category', categorySchema)