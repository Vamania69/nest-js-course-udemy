import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(email: string, password: string): Promise<import("../../user/entities/user.entity").User>;
}
export {};
