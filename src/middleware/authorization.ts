import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { supabase } from 'src/supabase/client';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error("Authorization header is missing");
        }

        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            throw new Error("Token is missing in the authorization header");
        }

        const { data, error } = await supabase().auth.getUser(token)
        if (error) {
            throw new Error("Not Authorized")
        }

        next();
    }
}
