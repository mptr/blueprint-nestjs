import { OAuthProviderMap } from './oauth.module-options';

describe('OAuthProviderMap', () => {
	it('should retrieve configs by name', async () => {
		const providerA = { name: 'providerA', strategy: {}, config: {} };
		const providerB = { name: 'providerB', strategy: {}, config: {} };
		const providerMap = new OAuthProviderMap([providerA, providerB] as any);

		expect(providerMap.get('providerA')).toBe(providerA);
		expect(providerMap.get('providerB')).toBe(providerB);
		expect(() => providerMap.get('providerC')).toThrowError('Unknown OAuth provider: providerC');
	});
});
