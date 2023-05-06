import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { init } from './init-helper';

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let jwtService: JwtService;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await init().compile();
		jwtService = moduleFixture.get<JwtService>(JwtService);
		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('should require authentication', async () => {
		await request(app.getHttpServer()).get('/').expect(401);

		await request(app.getHttpServer())
			.get('/auth/github')
			.expect(302)
			.expect(r => {
				expect(r.header.location).toContain('https://github.com');
			});
	});

	it('should allow with jwt', async () => {
		// ok with valid jwt
		await request(app.getHttpServer())
			.get('/')
			.set('Authorization', 'Bearer ' + jwtService.sign({ id: '123' }))
			.expect(200);

		// @ts-ignore testing
		jwtService.options.secret = jwtService.options.secret.replace('0', '1');
		// not ok with invalid jwt
		await request(app.getHttpServer())
			.get('/')
			.set('Authorization', 'Bearer ' + jwtService.sign({ id: '123' }))
			.expect(401);
	});
});
