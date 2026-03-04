import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .auth import get_access_token, get_client_id, authenticate

# Create your views here.
clientID = get_client_id()
url = 'https://api.igdb.com/v4/games'

gamefilter = [18, 19, 4, 21, 5, 41, 130, 33, 22, 24, 20, 37, 7, 8, 9, 48, 167, 38, 46, 11, 12, 49, 169]


@api_view(['GET'])
def healthCheck(request):
    return Response({"message": "Okay"}, status=200)


def igdbPost(query: str):
    try:
        access_token = get_access_token()
        headers = {
            "Client-ID": f"{clientID}",
            "Authorization": f"Bearer {access_token}"
        }
        response = requests.post(url, headers=headers, data=query)
        if response.status_code == 401:
            access_token = authenticate()
            response = requests.post(url, headers=headers, data=query)
        return response
    except Exception as e:
        import traceback
        traceback.print_exc()  # prints full stack trace
        return Response({"error": str(e)}, status=500)


@api_view(['GET'])
def searchGames(request, query):
    try:
        data = (f'search "{query}"; fields name, summary, '
                f'cover.image_id; where game_type = (0,8,9,11) & '
                f'platforms = ({','.join(map(str, gamefilter))}) & version_parent = null & first_release_date != null; limit 25;')

        response = igdbPost(data)
        return Response(response.json(), status=response.status_code)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def getAGame(request, id):
    try:
        data = (f' fields name, summary, cover.image_id; '
                f'where id = ({id}) & version_parent = null ;')
        response = igdbPost(data)
        return Response(response.json(), status=response.status_code)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)
