import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

// restrain the PropertyDecorator type to a generic type

export const FallbackTransform = <T = any>(fallback: (obj: T) => any, options?: TransformOptions) =>
	Transform((p: TransformFnParams) => p.value || fallback(p.obj), options);
