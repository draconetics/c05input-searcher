import mongoose from 'mongoose'
import { NextFunction, Response, Request} from 'express'
import Product from '../models/Product';
import { IProduct } from '../interfaces/IProduct';
import { HttpException } from '../common/HttpException';
import { client } from '../config/elasticsearch.config';

export const getProductList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => { 
    //console.log("get list");
    try{
        const categories:IProduct[] = await Product.find({});
        let resp = {
          status: 200,
          message: "success",
          data: categories
        }
        const response = await client.search({
          index: 'product',
          type: 'default',
          body: {
            query: {
              match: {
                body: 'nada'
              }
            }
          }
        });
        console.log(response)
        res.status(200).json(resp);
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };

  export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    
    try{
        let newProduct:IProduct = new Product(req.body);
        await newProduct.save();
        client.index({
          index:'product',
          type:'default',
          body: req.body
        }).then(function (body:any) {
          //var hits = body.hits.hits;
          console.log(body);
          return res.status(201).json({status:201,message:"success",data:newProduct});
        }, function (error:object) {
          console.trace(error);
          return next(new HttpException(500,"cannot save to elasticsearch"));
        });

    }catch(e){
      return next(new HttpException(e.status,e.message));
    } 
    
  };


  export const addCategoryToProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("post method");
    console.log(req.body);
    try{
        if(!req.body.idProduct && !req.body.idCategory)
            next(new HttpException(500,"idProduct is required and idCategory"));    
        const productFound:IProduct|null = await Product.findOne({_id: req.body.idProduct})
        if(productFound){
            productFound.categories = productFound.categories.concat(req.body.idCategory)
            productFound.save(function(err){
                if(err) next(new HttpException(500,"We cannot save addCategoryToProduct"));;
                console.log("product saved")
              });
            res.status(200).json({status:200, message:"success", data:productFound});
        }
            
        next(new HttpException(500,"product not Found"));
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };

  export const searchProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        console.log(req.query);
        let query:any = req.query;
        if(!query || !query.q)
            return next(new HttpException(500,"Nothing to search"));

            await client.search({
              index: 'product',
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
        return next(new HttpException(e.status,e.message));
      }
  };

  export const deleteProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        let id = mongoose.Types.ObjectId(req.params.id);
        const productFound:IProduct|null = await Product.findByIdAndRemove(id)
        //console.log(productFound)
        if(productFound)
            res.status(200).json({status:200, message:"success", data:productFound});
        next(new HttpException(500,"Not found element to delete"));
      }catch(e){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };