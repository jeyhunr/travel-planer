import { OmitType } from '@nestjs/mapped-types';
import { User } from '../../generated/validator/models';
import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(User, ['uid', 'createdAt', 'updatedAt', 'deletedAt', 'isAdmin', 'tokens']) {
  @IsDefined()
  @IsString()
  repeatPassword!: string;
}
