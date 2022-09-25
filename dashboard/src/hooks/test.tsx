import React, { useState, useEffect } from 'react';
import { createClient, SupabaseRealtimePayload } from '@supabase/supabase-js';
import { definitions } from '../types/supabase';

export function useCurrentAlerts(): definitions['alert'][] {
    const [alerts, setAlerts] = useState<definitions['alert'][]>([]);

    useEffect(() => {
        console.log('test');
        const supabase = createClient(
            'https://oqymqfvmhnwgmuofdfnw.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeW1xZnZtaG53Z211b2ZkZm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwNzI5MjQsImV4cCI6MTk3OTY0ODkyNH0.ycRqYCaM9D49uWy-bli_R3Y9KwOMNaZ5Wxh7kdqxUBc'
        );
        supabase
            .from('alert')
            .select('*')
            .then((response) => {
                if (!response.error) {
                    console.log(response.data);
                    setAlerts(response.data);
                } else {
                    console.log(response.error);
                }
            });
    });

    return alerts;
}
