import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { supabase } from 'src/supabase/client';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers.authorization);
        const { data, error } = await supabase().auth.getUser(req.headers.authorization)
        if (error) {
            return {
                statusCode: 403,
                message: "Not Authorized"
            }
        }

        console.log(data);
        console.log('Request...');
        next();
    }
}
