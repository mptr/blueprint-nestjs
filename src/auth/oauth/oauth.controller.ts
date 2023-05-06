import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { Constructor } from 'src/util/types';

/**
 * @description a nestjs controller class that exposes the OAuth login and callback routes for the given guard
 */
interface IAuthController {
	login(): void;
	callback(_req: Request): Promise<{ accessToken: string }>;
}

/**
 * @param guardName name of the OAuth guard to use
 * @returns a nestjs controller class that exposes the OAuth login and callback routes for the given guard
 */
export const AuthControllerFactory = (guardName: string): Constructor<IAuthController> => {
	@Controller('auth/' + guardName)
	class AuthController implements IAuthController {
		constructor(private authService: AuthService) {}

		@Get()
		@UseGuards(AuthGuard(guardName))
		login() {
			return;
		}

		@Get('callback')
		@UseGuards(AuthGuard(guardName))
		callback(@Req() req: Request) {
			return this.authService.login(req.user);
		}
	}
	return AuthController;
};
