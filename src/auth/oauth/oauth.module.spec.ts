import { NestFactory } from '@nestjs/core';
import { AuthModule } from '../auth.module';

describe('OauthModule', () => {
	it('should compile with envs', async () => {
		process.env['OAUTH_GITHUB_ID'] = 'test-id';
		process.env['OAUTH_GITHUB_SECRET'] = 'test-secret';
		process.env['JWT_SECRET'] = 'test-jwt-secret';

		const app = await NestFactory.create(AuthModule, {
			logger: false,
		});
		await app.init();

		const server = app.getHttpServer();
		const router = server._events.request._router;
		const routes = router.stack.map((layer: any) => layer.route?.path).filter(Boolean);

		// test that the oauth routes are registered
		['/auth/github', '/auth/github/callback'].forEach(r => expect(routes).toContain(r));
	});
});
