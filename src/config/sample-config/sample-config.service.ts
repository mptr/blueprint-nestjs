import { Injectable } from '@nestjs/common';

interface ModuleOptionsFactory {
	create(): ModuleOptions | Promise<ModuleOptions>;
}

interface ModuleOptions {
	key: string;
}

@Injectable()
export class SampleConfigService implements ModuleOptionsFactory {
	create(): ModuleOptions {
		return {
			key: 'value',
		};
	}
}
