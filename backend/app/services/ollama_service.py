import requests
import os
from ollama import Client
from app.config import settings

url = "https://ollama.com"
client = Client(host=url, headers={'Authorization': 'Bearer' + os.getenv("OLLAMA_API_KEY")})


def generate_response(prompt: str):

    messages = [
        {"role": "user", "content": prompt}
    ]

    try:
        response = client.chat(model="qwen3.5:397b-cloud", messages=messages)

        print("STATUS:", response.status_code)
        print("RAW:", response.text)

        response.raise_for_status()

        data = response.json()

        return data["choices"][0]["message"]["content"]

    except Exception as e:
        print("OLLAMA CLOUD ERROR:", e)
        return "Cloud model error."