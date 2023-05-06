import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
	createJwtOptions(): JwtModuleOptions {
		const { JWT_SECRET } = process.env;
		return {
			secret: JWT_SECRET,
			signOptions: {
				expiresIn: '4h',
			},
		};
	}
}
