import { NextFunction, Response, Request} from 'express'
import { HttpException } from '../common/HttpException';
import { client } from '../config/elasticsearch.config';


export const search = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        console.log(req.query);
        let query:any = req.query;
        if(!query || !query.q){
            return next(new HttpException(500,"Nothing to search"));
        }
            

        await client.search({
            index: ['product','category'],
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