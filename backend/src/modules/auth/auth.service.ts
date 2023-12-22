import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/common/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}
}
