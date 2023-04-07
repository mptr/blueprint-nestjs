import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { SampleConfigService } from './sample-config/sample-config.service';

const services = [SampleConfigService];

@Module({
	imports: [
		NestConfigModule.forRoot({
			// apply this config to all modules
			isGlobal: true,
			// load environment variables from .env file
			envFilePath: '.env',
		}),
	],
	controllers: [],
	providers: services,
	exports: services,
})
export class ConfigModule {}
