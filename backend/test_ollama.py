import requests
from ollama import Client

API_KEY = "f3f378a47cb84327a06b9fef4fa8950e.1ieJPHZt7H7b2V1meSaPGB9v"

url = "https://ollama.com"
client = Client(host=url, headers={'Authorization': 'Bearer f3f378a47cb84327a06b9fef4fa8950e.1ieJPHZt7H7b2V1meSaPGB9v'})

messages = [
    {"role": "user", "content": "You are a helpful assistant."},
]

response = client.chat(model="qwen3.5:397b-cloud", messages=messages)

# print("STATUS:", response.status_code)
# print("RESPONSE:", response.text)

print(response)