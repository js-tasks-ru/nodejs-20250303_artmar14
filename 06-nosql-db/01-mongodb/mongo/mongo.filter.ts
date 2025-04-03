import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response : Response = host.switchToHttp().getResponse()

    let message: string = 'Database error'

    if (exception instanceof mongoose.Error.ValidationError) {
      message = 'Validation error message'
    } else if (exception instanceof mongoose.mongo.MongoError) {
      message = 'Duplicate key error'
    }

    response
      .status(400)
      .json({
        error: 'Bad Request',
        statusCode: 400,
        message,
      })
  }
}
