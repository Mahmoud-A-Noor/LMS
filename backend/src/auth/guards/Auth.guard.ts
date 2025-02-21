import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { path, method } = request;
    if (path.startsWith('/auth/login') || path.startsWith('/auth/register')) {
      return true;
    }
    
    return super.canActivate(context); // Calls the default JWT guard
  }

  // here we override the handleRequest method to throw a custom error (Optional)
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new UnauthorizedException('You need to log in to access this resource.');
    }
    return user;
  }
}
