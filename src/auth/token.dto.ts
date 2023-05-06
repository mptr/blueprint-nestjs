import { plainToInstance } from 'class-transformer';
import { IsString, IsNotEmpty, IsIn, IsOptional, IsEmail, IsUrl } from 'class-validator';
import { Profile } from 'passport';
import { OAuthConfigService } from 'src/config/oauth-config/oauth-config.service';
import { FallbackTransform } from 'src/util/fallback-transform.decorator';
import { validate } from 'src/util/validator';

export type UserId = string;

export class TokenBaseDto {
	/**
	 * @description the id of the user (from auth token subject)
	 */
	@IsString()
	@IsNotEmpty()
	id!: string;

	/**
	 * @description the name of the OAuth provider
	 * Has to be registered in the `OAuthConfigService`
	 */
	@IsString()
	@IsIn(OAuthConfigService.STRATEGIES.map(s => s.name))
	provider!: string;

	@IsString()
	@IsNotEmpty()
	username!: string;

	get identifier() {
		return `${this.provider}:${this.id}`;
	}
}

/**
 * @description a DTO for the access token
 * This token is issued by the OAuth provider and is used to authenticate the user
 */
export class AccessTokenDto extends TokenBaseDto implements Profile {
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	@FallbackTransform(obj => obj.name?.givenName)
	firstName?: string;

	@IsString()
	@IsOptional()
	@IsNotEmpty()
	@FallbackTransform(obj => obj.name?.familyName)
	lastName?: string;

	@IsEmail()
	@IsOptional()
	@FallbackTransform(obj => obj.emails?.[0]?.value)
	email?: string;

	@IsUrl()
	@IsOptional()
	@FallbackTransform(obj => obj.photos?.[0]?.value)
	photoUrl!: string;

	set displayName(value: string) {
		this.username = value;
	}

	get displayName() {
		return this.username;
	}

	static async fromPlain(obj: any): Promise<AccessTokenDto> {
		return validate(plainToInstance(AccessTokenDto, obj));
	}
}

export class JwtDto extends TokenBaseDto {
	/**
	 * @description the id of the user (from auth token subject)
	 */
	@IsString()
	@IsNotEmpty()
	userId!: string;

	static fromAccessToken(id: UserId, accessToken: AccessTokenDto): Promise<JwtDto> {
		return validate(
			plainToInstance(JwtDto, {
				...accessToken,
				userId: id,
			}),
		);
	}
}
