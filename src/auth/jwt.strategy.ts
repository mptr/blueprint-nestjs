import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { JwtDto } from './token.dto';

export const Jwt = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	return request.user as JwtDto;
});

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy, 'jwt') {
	constructor(configService: JwtConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.createJwtOptions().secret,
		});
	}

	async validate(payload: any) {
		return {
			...payload,
			userId: payload.userId,
		} as JwtDto;
	}
}
