import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "express";
import { jwtDecode } from "jwt-decode";

const testJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOb2RlSlMgSG9tZXdvcmsiLCJpYXQiOjE3NDMwNjkyMDIsImV4cCI6MTc3NDYwNTIwMywiYXVkIjoiIiwic3ViIjoiIiwiR2l2ZW5OYW1lIjoiQXJ0ZW0iLCJyb2xlIjoiYWRtaW4ifQ.xo93kfCMzGF6tlP3iMvfKtMyKATTMHLGO6rSn827CJc'

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) : boolean {
    const request : Request = context.switchToHttp().getRequest()

    //JWT decoding (for now JWT token is hardcoded)
    const decodedToken : any = jwtDecode(testJWT);
    console.log('JWT token user role: ', decodedToken.role);


    if (request.headers['x-role'] !== 'admin') throw new ForbiddenException("Доступ запрещён: требуется роль admin")
    return request.headers['x-role'] === 'admin'
  }
}
