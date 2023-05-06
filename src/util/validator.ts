import { BadRequestException } from '@nestjs/common';
import { validate as classValidate } from 'class-validator';

export const validate = async <T extends object>(o: T) => {
	const errors = await classValidate(o, { whitelist: true });
	if (errors.length === 0) return o;
	throw new BadRequestException(
		errors.map(e => ({ ...e.constraints, property: e.property })),
		'Invalid ' + o.constructor.name,
	);
};
