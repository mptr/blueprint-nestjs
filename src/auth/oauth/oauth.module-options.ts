import OAuth2Strategy from 'passport-oauth2';
import { Constructor } from 'src/util/types';

/**
 * @description configuration for an OAuth provider with a specific strategy
 */
type OAuthProviderConfig<T extends Constructor<OAuth2Strategy>> = {
	strategy: T;
	name: string;
	config: ConstructorParameters<T>[0];
};

/**
 * @description configuration for any OAuth provider
 */
export type OAuthProvider = OAuthProviderConfig<Constructor<OAuth2Strategy>>;

/**
 * @description a map of OAuth providers to their configs
 */
export class OAuthProviderMap {
	constructor(public readonly config: OAuthProvider[]) {}
	get(name: string) {
		const r = this.config.find(c => c.name === name);
		if (!r) throw new Error(`Unknown OAuth provider: ${name}`);
		return r;
	}
}
