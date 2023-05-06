import {
	ConfigurableModuleAsyncOptions,
	ConfigurableModuleBuilder,
	DynamicModule,
	Module,
	forwardRef,
} from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { AuthModule } from '../auth.module';
import { OAuthConfigService } from 'src/config/oauth-config/oauth-config.service';
import { AuthControllerFactory } from './oauth.controller';
import { OAuthProviderMap } from './oauth.module-options';
import { StrategyFactory } from './oauth.strategy';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
	new ConfigurableModuleBuilder<OAuthProviderMap>().build();

/**
 * Dynamic module that registers OAuth strategies and controllers
 */
@Module({
	imports: [PassportModule, forwardRef(() => AuthModule)],
})
export class OAuthModule extends ConfigurableModuleClass {
	static override registerAsync(options: ConfigurableModuleAsyncOptions<OAuthProviderMap, 'create'>) {
		return this.extendModule(super.registerAsync(options));
	}

	static override register(options: OAuthProviderMap) {
		return this.extendModule(super.register(options));
	}

	private static extendModule(m: DynamicModule): DynamicModule {
		if (!m.providers) m.providers = [];
		m.providers.push(
			...OAuthConfigService.STRATEGIES.map(s => StrategyFactory(PassportStrategy(s.strategy, s.name), s.name)),
		);

		if (!m.controllers) m.controllers = [];
		m.controllers.push(...OAuthConfigService.STRATEGIES.map(s => AuthControllerFactory(s.name)));
		return m;
	}
}
