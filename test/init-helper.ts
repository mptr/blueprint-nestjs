import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

export const init = (
	meta: ModuleMetadata = {
		imports: [AppModule],
	},
): TestingModuleBuilder => {
	if (!meta.providers) meta.providers = [];

	meta.providers.push({
		provide: NestConfigModule,
		useValue: NestConfigModule.forRoot({
			// apply this config to all modules
			isGlobal: true,
			// load environment variables from .env file
			envFilePath: '.env.test',
		}),
	});

	return Test.createTestingModule(meta);
};
