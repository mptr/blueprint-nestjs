import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	const signResult = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService, { provide: JwtService, useValue: { sign: jest.fn().mockReturnValue(signResult) } }],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should convert an oauth access token to a jwt', async () => {
		const token = {
			id: '123',
			provider: 'github',
			username: 'mmuster',
		};
		const jwt = await service.login(token);
		expect(jwt.accessToken).toBe(signResult);
	});
});
