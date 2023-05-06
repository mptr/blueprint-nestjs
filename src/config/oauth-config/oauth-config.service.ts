import { Injectable } from '@nestjs/common';
import { StrategyOptions as GitHubOptions, Strategy as GitHubStrategy } from 'passport-github';
import { OAuthProvider, OAuthProviderMap } from 'src/auth/oauth/oauth.module-options';

@Injectable()
export class OAuthConfigService {
	/**
	 * List of OAuth providers to use
	 * This has to be static because it needs to be known which providers are available at bootstrap-time
	 */
	static readonly STRATEGIES: Omit<OAuthProvider, 'config'>[] = [
		{ strategy: GitHubStrategy, name: 'github' },
		// add other strategies here
	];

	/**
	 * @returns a map of OAuth providers to their configs
	 * the configs are loaded through DI in order to use the
	 * ConfigService dependencies to compute the configs
	 */
	create(): OAuthProviderMap {
		return new OAuthProviderMap(
			OAuthConfigService.STRATEGIES.map(strategy => ({
				...strategy,
				config: this.getConfig(strategy.name),
			})),
		);
	}

	/**
	 * helper function to get the config for a given strategy
	 * @param name strategy name to get config for
	 * @returns the config for the given strategy
	 */
	private getConfig(name: string) {
		switch (name) {
			case 'github':
				return this.githubConfig;
			default:
				throw new Error(`Unknown OAuth provider: ${name}`);
		}
	}

	/**
	 * @returns the config for the GitHub strategy
	 */
	private get githubConfig(): GitHubOptions {
		const { OAUTH_GITHUB_ID, OAUTH_GITHUB_SECRET } = process.env;
		if (!OAUTH_GITHUB_ID || !OAUTH_GITHUB_SECRET)
			throw new Error('OAUTH_GITHUB_ID and OAUTH_GITHUB_SECRET must be set in the environment');
		return {
			clientID: OAUTH_GITHUB_ID,
			clientSecret: OAUTH_GITHUB_SECRET,
			callbackURL: 'http://localhost:3000/auth/github/callback',
			scope: ['user:email'],
		};
	}
}
