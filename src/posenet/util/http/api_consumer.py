import firebase

class ApiConsumer():
    
    @classmethod
    def do_request(cls,url,body):
        headers = {"Content-Type": "application/json; charset=utf-8"}
        payload = firebase.requests.post(url=url, json=body, headers=headers)
        
        return payload.json()