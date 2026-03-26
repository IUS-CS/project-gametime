import requests
import os
from dotenv import load_dotenv
load_dotenv()

# this gets the client id and client secret from he env file
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
# no access token at the moment
access_token = None

# this dict with store id secret with the grant type set to credentials
generategametoken = {
    "client_id": f"{client_id}",
    "client_secret": f"{client_secret}",
    "grant_type": "client_credentials"
}


# this will get the access token
def get_access_token():
    global access_token
    if access_token is None:    # if no token is available then call function
        access_token = igdb_authenticate()
    return access_token


# get client id
def get_client_id():
    return client_id


# authenticate the token and refresh
def igdb_authenticate():
    # this is the global acess token
    global access_token
    # url for refresh
    url = 'https://id.twitch.tv/oauth2/token'
    # give url and generategame token to parms
    response = requests.post(url, params=generategametoken)
    response.raise_for_status()     # if there is any problem it listens for it
    # get access token from request
    access_token = response.json()['access_token']
    return access_token

