import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { createClient, SupabaseRealtimePayload } from '@supabase/supabase-js';
import { definitions } from 'types/supabase';
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

validateEnv();

const app = new App([]);

const MOCK_USER = '2372f7ea-094f-4bd2-ad68-9d393d355c89';

const signalListener = async (payload: SupabaseRealtimePayload<definitions['signal']>) => {
  if (!payload.new) return;
  const { new: entry } = payload;

  if (entry.type == 'bpm') {
    if (entry.value > 100) {
      const inisightCommit = await supabase
        .from<definitions['insight']>('insight')
        .insert({
          user: MOCK_USER,
          value: {
            value: entry.value,
            type: 'high bpm',
            signals: ['bpm'],
          },
        })
        .single();
      if (!inisightCommit.error) {
        const alert = await supabase.from<definitions['alert']>('alert').insert({
          user: MOCK_USER,
          insight: inisightCommit.data.id,
          severity: 1,
        });
        console.log(alert.data);
      }
    } else {
      console.log('no alert');
    }
  }
};

const sub = supabase.from('signal').on('INSERT', signalListener).subscribe();
console.log(sub);

app.listen();
