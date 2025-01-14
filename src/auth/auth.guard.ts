// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

// import { verify } from 'jsonwebtoken';
// import { UserService } from 'src/user/user.service';

// interface JwtPayload {
//   id: number;
// }

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly userService: UserService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Authorization header missing or malformed');
//     }

//     try {
//       const token = authHeader.split(' ')[1];
//       console.log(token);
//       const payload = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as JwtPayload;

//       const user = await this.userService.findOne(payload.id);
//       if (!user) {
//         throw new UnauthorizedException('User not found');
//       }

//       request.currentUser = user; // Attach the user to the request
//       return true;
//     } 
//     catch (error) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }
