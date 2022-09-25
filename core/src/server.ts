import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

validateEnv();

const app = new App([]);

const sub = supabase.from('signal').on('*', console.log).subscribe();
console.log(sub);

app.listen();
