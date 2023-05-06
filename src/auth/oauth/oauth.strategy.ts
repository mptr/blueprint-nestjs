import { Inject, Injectable, Logger } from '@nestjs/common';
import { Type } from '@nestjs/passport';
import { Profile } from 'passport';
import { MODULE_OPTIONS_TOKEN } from './oauth.module';
import { OAuthProviderMap } from './oauth.module-options';

type PassportStategyClass<T extends Type<any> = any> = { new (...args: any[]): InstanceType<T> };

/**
 * @param BaseStrategy The passport strategy class to extend
 * @param name The name of the strategy (to be used in guars)
 * @returns a nestjs injectable class that extends the given passport strategy
 */
export const StrategyFactory = (BaseStrategy: PassportStategyClass, name: string) => {
	@Injectable()
	class OAuthStrategy extends BaseStrategy {
		constructor(@Inject(MODULE_OPTIONS_TOKEN) providers: OAuthProviderMap) {
			super(providers.get(name).config);
			new Logger(OAuthStrategy.name).log(`Created ${name} OAuth strategy`);
		}

		async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
			return profile;
		}
	}

	return OAuthStrategy;
};
