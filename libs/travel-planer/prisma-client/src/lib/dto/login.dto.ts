import { PickType } from '@nestjs/mapped-types';
import { User } from '../../generated/validator/models';

export class LoginDto extends PickType(User, ['email', 'password']) {}
