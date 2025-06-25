import { OmitType } from '@nestjs/mapped-types';
import { IsDefined, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class ChangePasswordDto extends OmitType(CreateUserDto, ['email', 'firstName', 'lastName', 'username']) {
  @IsDefined()
  @IsString()
  currentPassword!: string;
}
