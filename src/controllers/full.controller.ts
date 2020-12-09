import mongoose from 'mongoose'
import { NextFunction, Response, Request, request} from 'express'
import { HttpException } from '../common/HttpException';
import { ICategory } from '../interfaces/ICategory';
import Category from '../models/Category';
import Product from '../models/Product';


export const fullDatabase = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    
    try{
        let phonesCategory = new Category({name:"smarthpone"});

        let j7 = new Product({name:"j7 samsung",price:23.1})
        phonesCategory.products = phonesCategory.products.concat(j7._id)
        j7.categories = j7.categories.concat(phonesCategory._id);

        let s10 = new Product({name:"galaxy s10", price:12});
        phonesCategory.products = phonesCategory.products.concat(s10._id);
        s10.categories = s10.categories.concat(phonesCategory._id)

        let iphone = new Product({name:"iphone 10s", price:50})
        phonesCategory.products = phonesCategory.products.concat(iphone._id)
        iphone.categories = iphone.categories.concat(phonesCategory._id)
        
        await iphone.save();
        await s10.save();
        await j7.save();
        await phonesCategory.save();

        res.status(200).json("success");
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };