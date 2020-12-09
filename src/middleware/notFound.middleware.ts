import { Request, Response } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response
) => {

  const message = "Resource not found";
  return response.status(404).send({status:404,message});
};