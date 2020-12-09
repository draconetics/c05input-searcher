import {HttpException} from "../common/HttpException";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if(error !== null){
    
    //console.log(error);
    const status = error.status || 500;
    const message = error.message || "It's not you. It's us. We are having some problems.";
    const description = error.description || "";
  
    response.status(status).json({status,message,description});
  }
    next();
};