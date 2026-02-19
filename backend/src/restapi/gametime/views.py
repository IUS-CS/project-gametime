import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .auth import get_access_token, get_client_id, authenticate

# Create your views here.
clientID = get_client_id()
url = 'https://api.igdb.com/v4/games'


@api_view(['GET'])
def healthCheck(request):
    return Response({"message": "Okay"}, status=200)


@api_view(['GET'])
def searchGames(request, query):
    try:
        access_token = get_access_token()
        headers = {
            "Client-ID": f"{clientID}",
            "Authorization": f"Bearer {access_token}"
        }
        data = data = f'search "{query}"; fields name, summary;'
        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 401:
            access_token = authenticate()
            response = requests.post(url, headers=headers, data=data)
        return Response(response.json(), status=response.status_code)
    except Exception as e:
        import traceback
        traceback.print_exc()  # prints full stack trace
        return Response({"error": str(e)}, status=500)
