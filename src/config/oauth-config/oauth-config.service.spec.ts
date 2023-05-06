import { TestingModule } from '@nestjs/testing';
import { init } from 'test/init-helper';
import { OAuthProviderMap } from 'src/auth/oauth/oauth.module-options';
import { OAuthConfigService } from './oauth-config.service';

describe('OAuthConfigService', () => {
	let service: OAuthConfigService;
	let configMap: OAuthProviderMap;

	beforeEach(async () => {
		const module: TestingModule = await init({
			providers: [OAuthConfigService],
		}).compile();

		service = module.get<OAuthConfigService>(OAuthConfigService);
		configMap = service.create();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	test.each(OAuthConfigService.STRATEGIES)('should supply a valid config for %s', strategy => {
		expect(configMap.get(strategy.name)).toBeDefined();
	});
});
