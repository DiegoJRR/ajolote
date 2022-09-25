import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { definitions } from "../types/supabase";

// TODO: Mover esto a un archivo comun para los juks
const supabase = createClient(
  "https://oqymqfvmhnwgmuofdfnw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeW1xZnZtaG53Z211b2ZkZm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwNzI5MjQsImV4cCI6MTk3OTY0ODkyNH0.ycRqYCaM9D49uWy-bli_R3Y9KwOMNaZ5Wxh7kdqxUBc"
);

const useInsight = (insight_id: number) => {
  const [insight, setInsight] = useState<definitions["insight"]>();

  useEffect(() => {
    supabase
      .from<definitions["insight"]>("insight")
      .select("*")
      .eq("id", insight_id)
      .then((response) => setInsight(response.data?.at(0)));
  }, []);

  return insight;
};

export default useInsight;
