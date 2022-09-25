import { createClient, SupabaseRealtimePayload } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { definitions } from "../types/supabase";

// TODO: Mover esto a un archivo comun para los juks
const supabase = createClient(
  "https://oqymqfvmhnwgmuofdfnw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeW1xZnZtaG53Z211b2ZkZm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwNzI5MjQsImV4cCI6MTk3OTY0ODkyNH0.ycRqYCaM9D49uWy-bli_R3Y9KwOMNaZ5Wxh7kdqxUBc"
);

const useSignals = (user_id: string) => {
  const [signals, setSignals] = useState<definitions["signal"][]>([]);

  useEffect(() => {
    supabase
      .from<definitions["signal"]>("signal")
      .select("*")
      .eq("user", user_id)
      .then((response) => {
        let signalsData = response.data;
        if (signalsData) {
          setSignals(signalsData);
        }
      });

    supabase
      .from(`signal:id=eq.${user_id}`)
      .on(
        "INSERT",
        (payload: SupabaseRealtimePayload<definitions["signal"]>) => {
          if (payload.new) {
            setSignals([...signals, payload.new]);
          }
        }
      );
  }, []);

  return signals;
};

export default useSignals;
