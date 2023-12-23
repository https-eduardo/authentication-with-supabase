import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class AuthLoginDto extends OmitType(CreateUserDto, ['name']) {}
