import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStraggy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){
        super();
    }

    async validate(username: string, password: string) {
        const user = this.authService.validateUser(username, password);
        return user;
    }
}