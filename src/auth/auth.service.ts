import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { AccessTokenDto, JwtDto, UserId } from './token.dto';

interface AccessTokenResponse {
	accessToken: string;
}

@Injectable()
export class AuthService {
	private logger = new Logger(AuthService.name);

	constructor(private jwtService: JwtService) {}

	/**
	 *
	 * @param data the access token data
	 * @returns
	 */
	async login(data: any): Promise<AccessTokenResponse> {
		const acessToken = await AccessTokenDto.fromPlain(data);

		const jwt = await this.toJwt(acessToken);

		this.logger.log(`Login: ${jwt.username} (${jwt.userId}) [${jwt.provider}]`);

		const plainJwt = instanceToPlain(jwt);
		return {
			accessToken: this.jwtService.sign(plainJwt),
			...plainJwt,
		};
	}

	/**
	 * convert the access token to a jwt
	 * @param at the access token to convert
	 * @returns a jwt for the user
	 */
	private async toJwt(at: AccessTokenDto): Promise<JwtDto> {
		// TODO: obtain the user id from a datasource
		const userId: UserId = 'unknown';

		return JwtDto.fromAccessToken(userId, at);
	}
}
