import { SampleConfigService } from './sample-config.service';

describe('KeycloakConfigService', () => {
	let service: SampleConfigService;

	beforeEach(() => {
		service = new SampleConfigService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return config', () => {
		expect(service.create()).toEqual({
			key: 'value',
		});
	});
});
