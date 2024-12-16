import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (request.method === 'POST') {
            response.status(200);
        }
        return next.handle().pipe(
            map((data) => ({
                code: 200,
                data,
                message:'success',
                timestamp: new Date().toISOString(), 
                path: request.url,
            })),
        );
    }

}