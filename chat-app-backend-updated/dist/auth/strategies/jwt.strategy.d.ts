import { ConfigService } from '@nestjs/config';
import { tokenPayload } from '../interfaces/jwt-token';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: tokenPayload): tokenPayload;
}
export {};
