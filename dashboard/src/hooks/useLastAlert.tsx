import { createClient, SupabaseRealtimePayload } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { definitions } from '../types/supabase';

const supabase = createClient(
    'https://oqymqfvmhnwgmuofdfnw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeW1xZnZtaG53Z211b2ZkZm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwNzI5MjQsImV4cCI6MTk3OTY0ODkyNH0.ycRqYCaM9D49uWy-bli_R3Y9KwOMNaZ5Wxh7kdqxUBc'
);

const USER_ID = '2372f7ea-094f-4bd2-ad68-9d393d355c89'

const useLastAlert = () => {
    const [lastAlert, setLastAlert] = useState<
        definitions['alert'] | undefined
    >();

    const acknowledge = (alert: definitions['alert']) => {
        supabase.from('alert')
            .update({ acknowledge: true})
            .eq('id', alert.id)
            .then((response) => {
                console.log(response)
            });
    }

    useEffect(() => {
        supabase
            .from(`alert:id=eq.${USER_ID}`)
            .on(
                'INSERT',
                (payload: SupabaseRealtimePayload<definitions['alert']>) => {
                    const {new: entry} = payload;
                    
                    setLastAlert(entry);
                }
            );
    }, []);

    return {lastAlert, acknowledge};
};

export default useLastAlert;
