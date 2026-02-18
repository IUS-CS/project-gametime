import requests
import os
from dotenv import load_dotenv
load_dotenv()
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
access_token = None

generategametoken = {
    "client_id": f"{client_id}",
    "client_secret": f"{client_secret}",
    "grant_type": "client_credentials"
}


def get_access_token():
    global access_token
    if access_token is None:
        access_token = authenticate()
    return access_token


def get_client_id():
    return client_id


def authenticate():
    global access_token
    url = 'https://id.twitch.tv/oauth2/token'
    response = requests.post(url, params=generategametoken)
    response.raise_for_status()
    access_token = response.json()['access_token']
    return access_token

