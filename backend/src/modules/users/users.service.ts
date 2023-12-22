import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.signUp(createUserDto);

    if (error) throw new HttpException(error.message, error.status);

    return data.user;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.admin.getUserById(id);

    if (error) throw new HttpException(error.message, error.status);

    return data.user;
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.admin.updateUserById(id, updateUserDto);

    if (error) throw new HttpException(error.message, error.status);

    return data.user;
  }

  async deleteOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.admin.deleteUser(id);

    if (error) throw new HttpException(error.message, error.status);

    return data.user;
  }
}
