import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { OAuthConfigService } from 'src/config/oauth-config/oauth-config.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { OAuthModule } from './oauth/oauth.module';

@Module({
	imports: [
		ConfigModule,
		PassportModule,
		OAuthModule.registerAsync({
			imports: [ConfigModule],
			useClass: OAuthConfigService,
		}),
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			useClass: JwtConfigService,
		}),
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
