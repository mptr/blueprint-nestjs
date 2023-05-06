import { BadRequestException } from '@nestjs/common';
import { IsString, IsOptional } from 'class-validator';
import { validate } from './validator';

class TestEntity {
	@IsString()
	name!: string;

	@IsString()
	@IsOptional()
	description?: string;

	notWhitelisted?: number;
}

describe('validator', () => {
	it('should be defined', async () => {
		const instance = new TestEntity();
		instance.name = 'Max Mustermann';
		instance.description = 'Hello World!';
		instance.notWhitelisted = 42;

		// should accept valid instance
		await expect(validate(instance)).resolves.toBe(instance);
		// should remove not whitelisted properties
		expect(instance.notWhitelisted).toBeUndefined();

		instance.name = 42 as unknown as 'string';
		// should throw BadRequestException
		await expect(validate(instance)).rejects.toThrowError(BadRequestException);
		// should have correct message
		const e: BadRequestException = await validate(instance).catch(e => e);
		expect(e.message).toBe('Bad Request Exception');
		expect(e.getResponse()).toMatchObject({
			statusCode: 400,
			message: [{ property: 'name', isString: 'name must be a string' }],
		});
	});
});
