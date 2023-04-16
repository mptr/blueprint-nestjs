import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

export const init = async (
	meta: ModuleMetadata = {
		imports: [AppModule],
	},
): Promise<TestingModule> => {
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

	return Test.createTestingModule(meta).compile();
};
