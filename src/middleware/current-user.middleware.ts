import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity;
        }
    }
}

interface JwtPayload {
    verifyTokenId : string;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userData: UserService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const Header = req.headers.authorization || req.headers.Authorization;
        if (!Header || isArray(Header) || !Header.startsWith('Bearer')) {
           //req.currentUser = null;
            next();
        }
        else {
            const token = Header.split(' ')[1];
            console.log(token);
            //const { verifyTokenId } = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as JwtPayload;
        
            // console.log(verifyTokenId);
            //const currentUser = await this.userData.findOne(+verifyTokenId);
            //req.currentUser = currentUser;
            //console.log(currentUser);
            next();
        }
    }
}

