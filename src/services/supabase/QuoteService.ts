import injector, { Bean } from 'wire-dependency-injection';
import AbstractService, { SERVICE_BEAN_TYPE } from '../AbstractService.js';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import Quote from '../../entity/Quote.js';
import EventError from '../../errors/EventError.js';
dotenv.config();

export default class QuoteService extends AbstractService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private supabase: SupabaseClient;

  public constructor(bean: Bean) {
    super(bean.getId());
    this.supabaseUrl = process.env.SUPABASE_URL as string;
    this.supabaseKey = process.env.SUPABASE_KEY as string;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  public async insertQuote(quote: Quote) {
    const { error } = await this.supabase.from('quote').insert(quote);
    if (error) {
      throw new EventError(error.message);
    }
  }
}

injector.registerBean(QuoteService, {
  type: SERVICE_BEAN_TYPE,
});
