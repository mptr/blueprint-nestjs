import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export const FallbackTransform = (fallback: (obj: any) => any, options?: TransformOptions) =>
	Transform((p: TransformFnParams) => p.value || fallback(p.obj), options);
