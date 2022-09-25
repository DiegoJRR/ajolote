import requests
from typing import Dict
from datetime import datetime

class Signal:
    def __init__(self, type: str, value: str, ts: datetime):
        self.pocketbase_url: str = "http://e222-131-178-102-216.ngrok.io"
        self.signals_endpoint = self.pocketbase_url + "/api/collections/signals/records"

        self.type = type
        self.value = value
        self.user_id = "2zz9y6mx403n1yl" 
        self.timestamp = str(ts)[:-3]

    def get_signal(self, signal_id: str = "hdoty6exl0pcuj4") -> Dict:
        response = requests.get(self.signals_endpoint + "/?id=" + signal_id)
        return response.json()['items']
    
    def post(self):
        data = {
            "type": self.type,
            "value": self.value,
            "user": self.user_id,
            "timestamp": self.timestamp
            }

        response = requests.post(self.signals_endpoint, json=data)
        print(response.request.body)
        print(response.text)

signal = Signal("mse", 2, datetime.now())
# print(signal.get_signal(""))
signal.post()
