import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { createClient, SupabaseRealtimePayload } from '@supabase/supabase-js';
import { definitions } from 'types/supabase';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

validateEnv();

const app = new App([]);

const MOCK_USER = '2372f7ea-094f-4bd2-ad68-9d393d355c89';

const minutesSinceDate = (date: Date | string): number => {
  if (typeof date == 'string') date = new Date(date);
  return Date.now() - date.getTime() / (1000 * 60);
};

const signalListener = async (payload: SupabaseRealtimePayload<definitions['signal']>) => {
  if (!payload.new) return;
  const { new: entry } = payload;

  if (entry.type == 'bpm') {
    console.log('entry');
    if (entry.value > 100) {
      console.log('trigger');
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
        const lastAlert = await supabase
          .from<definitions['alert']>('alert')
          .select('*')
          .eq('user', MOCK_USER)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        // if (lastAlert.data && minutesSinceDate(lastAlert.data.created_at) > 60) {
        if (lastAlert.data) {
          const alert = await supabase.from<definitions['alert']>('alert').insert({
            user: MOCK_USER,
            insight: inisightCommit.data.id,
            severity: 1,
          });
          console.log(alert.data);
        } else console.log(lastAlert.error);
      } else console.log(inisightCommit.error);
    } else {
      console.log('no alert');
    }
  }
};

const sub = supabase.from('signal').on('INSERT', signalListener).subscribe();
console.log(sub);

app.listen();
