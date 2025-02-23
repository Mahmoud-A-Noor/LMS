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

    const token = request.cookies?.accessToken;
    if (!token) {
      throw new UnauthorizedException('Access token not found.');
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
