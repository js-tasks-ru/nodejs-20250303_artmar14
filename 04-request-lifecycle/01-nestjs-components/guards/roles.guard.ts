import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "express";
import { jwtDecode } from "jwt-decode";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) : boolean {
    const request : Request = context.switchToHttp().getRequest()

    //JWT decoding
    if (request.headers['authorization']) {
      const decodedToken : any = jwtDecode(request.headers['authorization']);
      console.log('JWT token user role: ', decodedToken.role)
    }

    if (request.headers['x-role'] !== 'admin') throw new ForbiddenException("Доступ запрещён: требуется роль admin")
    return true
  }
}
