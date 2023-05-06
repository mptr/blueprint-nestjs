import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { JwtConfigService } from './jwt-config/jwt-config.service';
import { OAuthConfigService } from './oauth-config/oauth-config.service';

const services = [JwtConfigService, OAuthConfigService];

@Module({
	imports: [
		NestConfigModule.forRoot({
			// apply this config to all modules
			isGlobal: true,
			// load environment variables from .env file
			envFilePath: '.env',
		}),
	],
	controllers: [],
	providers: services,
	exports: services,
})
export class ConfigModule {}
