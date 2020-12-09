import mongoose from 'mongoose'
import { NextFunction, Response, Request, request} from 'express'
import { HttpException } from '../common/HttpException';
import { ICategory } from '../interfaces/ICategory';
import Category from '../models/Category';
import {client} from '../config/elasticsearch.config'

export const getCategoryList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    
    try{
        const products:ICategory[] = await Category.find({});
        let resp = {
          status: 200,
          message: "success",
          data: products
        }
        res.status(200).json(resp);
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };

  export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("post method");
    console.log(req.body);
    try{
        let newCategory:ICategory = new Category(req.body);
        await newCategory.save();
        client.index({
          index:'category',
          type:'default',
          id:newCategory._id+'',
          body: req.body
        }).then(function (body:any) {
          //var hits = body.hits.hits;
          console.log(body);
          return res.status(201).json({status:201,message:"success",data:newCategory});
        }, function (error:object) {
          console.trace(error);
          if(error)return next(new HttpException(500,"cannot save to elasticsearch"));
        });
    }catch(e){
        return next(new HttpException(e.status,e.message));
    } 
    
  };

  export const addProductToCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("post method");
    console.log(req.body);
    try{
        if(!req.body.idCategory && !req.body.idProduct)
            next(new HttpException(500,"idCategory is required"));    
        const categoryFound:ICategory|null = await Category.findOne({_id: req.body.idCategory})
        if(categoryFound){
            categoryFound.products = categoryFound.products.concat(req.body.idProduct)
            categoryFound.save(function(err){
                if(err) next(new HttpException(500,"We cannot save addProductToCategory"));;
                console.log("category saved")
              });
            res.status(200).json({status:200, message:"success", data:categoryFound});
        }
            
        next(new HttpException(500,"Category not Found"));
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };


  export const deleteCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        let id = mongoose.Types.ObjectId(req.params.id);
        const categoryFound:ICategory|null = await Category.findByIdAndRemove(id)
        //console.log(categoryFound)
        if(!categoryFound)
            return next(new HttpException(500,"category id not found"));
        await client.deleteByQuery({
          index: 'category',
          type: 'default',
          body: {
            query: {
                match: { _id: id }
            }
          }
        }, function (error:object, response:any) {
            console.log(response);
            if(error)return next(new HttpException(500,"error deleting on elasticsearch"));
                return res.status(200).json({status:200, message:"success", data:categoryFound});
        });

      }catch(e){
        //console.log("this is the catcher")
        //console.log(e)
        return next(new HttpException(e.status,e.message));
      }
  };


  export const searchCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        console.log(req.query);
        let query:any = req.query;
        if(!query && !query.q)
            next(new HttpException(500,"Nothing to search"));
           /*  const response = await client.search({
              q: 'tv'
            },(err:object, r:any)=>console.log(r)); */

            await client.search({
              index: 'category',
              type: 'default',
              body: {
                query: {
                  multi_match: {
                    query: query.q,
                    fields: ['name']
                  }
                }
              }
            }).then(function(response:any) {
              let hits = response.hits.hits;
              console.log(response)
              return res.status(200).json({data:hits});
            }).catch(function (error:any) {
              console.trace(error.message);
            }); 
      }catch(e){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };