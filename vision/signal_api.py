from typing import List

class Signal:
    def __init__(self, type: str, value: str, user_id: str, client):
        self.type = type
        self.value = value
        self.user_id = user_id
        self.client = client

    def get_signals(self) -> List:
        response = self.client.table("signal").select("*").execute()
        return response.data
    
    def post(self):
        data = {
            "type": self.type,
            "value": self.value,
            "user": self.user_id,
            }

        response = self.client.table("signal").insert(data).execute()
        print(response)

