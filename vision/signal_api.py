from supabase import create_client 
from typing import List

class Signal:
    def __init__(self, type: str, value: str, user_id: str):
        self.url = "https://oqymqfvmhnwgmuofdfnw.supabase.co"
        self.key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeW1xZnZtaG53Z211b2ZkZm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwNzI5MjQsImV4cCI6MTk3OTY0ODkyNH0.ycRqYCaM9D49uWy-bli_R3Y9KwOMNaZ5Wxh7kdqxUBc"
        self.supabase_client = create_client(self.url, self.key)

        self.type = type
        self.value = value
        self.user_id = user_id

    def get_signals(self) -> List:
        response = self.supabase_client.table("signal").select("*").execute()
        return response.data
    
    def post(self):
        data = {
            "type": self.type,
            "value": self.value,
            "user": self.user_id,
            }

        response = self.supabase_client.table("signal").insert(data).execute()
        print(response)

