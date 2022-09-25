import { definitions } from '../types/supabase';
import { User } from '@supabase/supabase-js';
import { useEffect } from 'react';
const useUser = (): { user: { id: string } } => {
    // return { user: { id: '2372f7ea-094f-4bd2-ad68-9d393d355c89' } };
    return { user: { id: 'c9e39269-d55a-47ed-9a68-8fdfb7f87200' } };
};

export default useUser;
