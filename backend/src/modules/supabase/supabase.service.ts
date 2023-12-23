import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getClient() {
    if (this.client) return this.client;

    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
      { auth: { autoRefreshToken: true, detectSessionInUrl: false } },
    );
    return this.client;
  }
}
