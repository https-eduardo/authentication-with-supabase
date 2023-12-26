import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class AuthLoginDto extends OmitType(CreateUserDto, ['name']) {}
