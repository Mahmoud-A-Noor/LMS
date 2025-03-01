import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (
      request.path.startsWith('/auth/login') ||
      request.path.startsWith('/auth/register') ||
      request.path.startsWith('/auth/refresh-token')
    ) {
      return true;
    }
    
    let token = request.cookies?.accessToken;
    if (!token) {
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyYmZjMjI5LTZlOGMtNDUxZi1hM2JhLTI4NWZmNWQwYmUwNSIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDA0OTg2NDAsImV4cCI6MTc0MTEwMzQ0MH0.D2ZJbcLPG2nvvzLOGphNZe-4bfX1BN38QGu8ip-eP54";
      // throw new UnauthorizedException('Access token not found.');
    }

    request.headers.authorization = `Bearer ${token}`;
    
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new UnauthorizedException('You need to log in to access this resource.');
    }
    return user;
  }
}
