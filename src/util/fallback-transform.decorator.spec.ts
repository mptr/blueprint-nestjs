import { Expose, instanceToPlain } from 'class-transformer';
import { FallbackTransform } from './fallback-transform.decorator';

class TestClass {
	@Expose()
	baseData!: string;

	@FallbackTransform(object => object.baseData)
	@Expose()
	additionalData?: string; // defaults to baseData
}

describe('FallbackTransform Decorator', () => {
	it('should not use the fallback if the value is set', () => {
		const testClass = new TestClass();
		testClass.baseData = 'base';
		testClass.additionalData = 'additional';
		const plain = instanceToPlain(testClass);
		expect(plain.additionalData).toBe('additional');
	});

	it('should use the fallback if the value is not set', () => {
		const testClass = new TestClass();
		testClass.baseData = 'base';
		const plain = instanceToPlain(testClass);
		expect(plain.additionalData).toBe('base');
	});
});
