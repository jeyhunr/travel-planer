import { OmitType } from '@nestjs/mapped-types';
import { User } from '../../generated/validator/models';

export class CreateUserDto extends OmitType(User, ['uid', 'createdAt', 'updatedAt', 'deletedAt']) {}
