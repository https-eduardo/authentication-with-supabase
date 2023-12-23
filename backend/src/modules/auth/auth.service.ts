import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}

  async login(authLoginDto: AuthLoginDto) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.signInWithPassword(authLoginDto);

    if (error) throw new HttpException(error.message, error.status);

    const session = data.session;
    delete session.user;

    return session;
  }

  async logout(jwtToken: string) {
    const { error } = await this.supabase
      .getClient()
      .auth.admin.signOut(jwtToken);

    if (error) throw new HttpException(error.message, error.status);
  }
}
