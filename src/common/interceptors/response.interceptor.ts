import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, timestamp } from "rxjs";


export class ResponseIterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        return {
          status: 'sucess',
          timestamp: new Date().toISOString(),
          duration: `${Date.now() - now}ms`,
          data,
        };
      }),
    );

  }

}