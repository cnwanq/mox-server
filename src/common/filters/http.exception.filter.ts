import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Logger } from "winston";



@Catch(HttpException) 
export class HttpExceptionFilter implements ExceptionFilter {
    // constructor(private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const results = exception.getResponse() as any;
        const code = results.statusCode;

        // 记录日志
        // const { method, originalUrl, body, query, params, ip }= request;
        // this.logger.error("HttpException", { res: { code, status, message: exception.message }, req: { method, url: originalUrl, body, query, params, ip } });

        return response.status(HttpStatus.OK).send({ code: status, meesage:exception.message, timestamp: new Date().toISOString(), path: request.url });
    }
}
