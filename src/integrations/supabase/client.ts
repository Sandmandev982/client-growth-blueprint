
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
export const supabaseUrl = 'https://lrruxjftdzvwlbjfuiew.supabase.co';
export const supabaseKey = process.env.SUPABASE_ANON_KEY || 'public-anon-key';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
