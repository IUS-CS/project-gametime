from urllib import request

import requests
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from .auth import get_access_token, get_client_id, igdb_authenticate
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import USER, REVIEWS, FAVORITES, FOLLOWGAME, FOLLOWUSER, BACKLOG
from .serializers import reviewSerializer, gameSerializer

# Create your views here.
# get the client id from the .env file
clientID = get_client_id()
# this is the url of a 3rd party database needed to get the games
url = 'https://api.igdb.com/v4/games'
# array of ids so that the amount of fan made romhacks are limited
gamefilter = [18, 19, 4, 21, 5, 41, 130, 33, 22, 24, 20, 37, 7, 8, 9, 48, 167, 38, 46, 11, 12, 49, 169]


# returns a simple okay to make sure that the frontend and backend can communicate
@api_view(['GET'])
def healthCheck(request):
    return Response({"message": "Okay"}, status=200)


# when needed to search for a specific game to review, the request will be sent here
def igdbPost(query: str):
    try:
        access_token = get_access_token()       # access token is obtained here
        headers = {                             # headers are set to have the client id and auth sent to IGDB
            "Client-ID": f"{clientID}",
            "Authorization": f"Bearer {access_token}"
        }
        # initiate a post request with the url, header above and query sent
        response = requests.post(url, headers=headers, data=query)
        # if not authorized we will resend the token
        if response.status_code == 401:
            access_token = igdb_authenticate()       # call authenticate which refreshes the token
            response = requests.post(url, headers=headers, data=query)  # resend request
        return response
    except Exception as e:
        import traceback
        traceback.print_exc()  # prints full stack trace
        return Response({"error": str(e)}, status=500)


# query is made here and this for a group of games
@api_view(['GET'])
def searchGames(request, query):
    try:
        # query for games that match the conditions given
        data = (f'search "{query}"; fields name, summary, '
                f'cover.image_id; where game_type = (0,8,9,11) & '
                f'platforms = ({','.join(map(str, gamefilter))}) '
                f'& version_parent = null & first_release_date != null; limit 25;')
        # send to method that post the query to IGDB's rest
        response = igdbPost(data)
        return Response(response.json(), status=response.status_code)  # send data to frontend
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)


# looking for one specific game by the id
@api_view(['GET'])
def getAGame(request, id):
    try:
        # id put into the id field
        data = (f' fields name, summary, cover.image_id, total_rating, '
                f'first_release_date, involved_companies.company.name, '
                f'age_ratings.organization, age_ratings.rating_category; '
                f'where id = ({id}) & version_parent = null ;')
        # send to function that handles post request
        response = igdbPost(data)
        return Response(response.json(), status=response.status_code)  # sent data to frontend
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)


# get account information header used to make sure they are authenicated
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAccountTest(request):
    # make sure the request is got
    if request.method == 'GET':
        user = request.user         # tell django to get from user table
        data = {                    # data of the user int question
            'username': user.username,
            'email': user.email,
            'date_joined': user.date_joined,
        }
    # send data to front end
    return Response(data, status=200)


# create an account
@api_view(['POST'])
@permission_classes([AllowAny])
def createAccount(request):
    if request.method == 'POST':        # make sure that they are posting
        data = request.data             # gets data from the request
        # this creates a user with the data provided from the frontend
        user = USER.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
        )
        # save this user into the database
        user.save()

        # creates a token for the user so they can stay sign in
        token, created = Token.objects.get_or_create(user=user)

        # this is what will be sent back to the frontend
        content = {
            'user': user.username,
            'token': token.key
        }
        # return the content
        return Response(content)


# this is for when the user needs to sign in
@api_view(['POST'])
@permission_classes([AllowAny])
def signIn(request):
    if request.method == 'POST':    # makes sure that the request is a post
        data = request.data         # get data from the frontend

        # checks if the data from frontend and database match
        user = authenticate(
            username=data['username'],
            password=data['password']
        )

        # if these users isn't valid then send a 400
        if user is None:
            return Response(
                {"error": "Invalid username or password"},
                status=400
            )

        # get token from database
        token, created = Token.objects.get_or_create(user=user)

        # send data back to frontend
        content = {
            'user': user.username,
            'token': token.key
        }
        return Response(content)
    return Response({'error': 'Invalid credentials'}, status=401)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReview(request):
    if request.method == 'POST':
        data = request.data
        user = USER.objects.get(username=data['username'])
        review = REVIEWS.objects.create(
            gameID=data['gameID'],
            userID=user,
            review=data['review'],
            rating=data['rating'],
            date=data['date'],
        )
        review.save()
        content = {
            "Review has been submitted!"
        }
        return Response(content)
    return Response({"error: Could not create review."}, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def getReviews(request, id):
    if request.method == 'GET':
        reviews = REVIEWS.objects.filter(gameID=id)
        serializer = reviewSerializer(reviews, many=True)
        return Response(serializer.data)
    return Response({'error: Could not get reviews'}, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteReview(request):
    if request.method == 'DELETE':
        data = request.data
        review = REVIEWS.objects.get(
            gameID=data['gameID'],
            userID=data['userID'],
            review=data['review'],
            rating=data['rating'],
            date=data['date'],
        )
        review.delete()
        content = {
            "Review has been deleted!"
        }
        return Response(content)
    return Response({"error: Could not delete review."}, status=400)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def handleFavorites(request):
    user = request.user
    gameID = request.data.get("gameID")
    if request.method == 'POST':
        favorites = FAVORITES.objects.create(
            userID=user,
            gameID=gameID,
        )
        favorites.save()
        content = {
            "Favorite has been added!"
        }
        return Response(content)
    if request.method == 'DELETE':
        favorites = FAVORITES.objects.get(
            userID=user,
            gameID=gameID,
        )
        favorites.delete()
        content = {
            "Favorite has been removed."
        }
        return Response(content)

    return Response({"error: Could not fufil request."}, status=400)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def handleFollowGames(request):
    user = request.user
    gameId = request.data.get("gameID")

    if request.method == 'POST':

        gamefollows = FOLLOWGAME.objects.create(
            gameID=gameId,
            followerID=user,
        )
        gamefollows.save()
        content = {
            "Game has been followed."
        }
        return Response(content)

    if request.method == 'DELETE':

        gamefollows = FOLLOWGAME.objects.get(
            followerID=user,
            gameID=gameId,
        )
        gamefollows.delete()

        content = {
            "Game has been unfollowed."
        }
        return Response(content)
    return Response({"error: Could not unfollow game."})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkIfFollowGame(request, id: int):
    user = request.user
    exists = FOLLOWGAME.objects.filter(followerID=user, gameID=id).exists()
    if exists:
        return Response(True, status=200)
    else:
        return Response(False, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handleBacklog(request):
    if request.method == 'POST':
        user = request.user
        backlogId = request.data.get("gameID")
        logged = BACKLOG.objects.create(
            gameID=backlogId,
            userID=user
        )
        logged.save()
        content = {"message": "Backlog"}
        return Response(content, status=200)
    return Response({"Couldn't backlog item"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkBacklog(request, id: int):
    user = request.user
    exists = BACKLOG.objects.filter(userID=user, gameID=id).exists()
    if exists:
        return Response(True, status=200)
    else:
        return Response(False, status=200)




@api_view(['POST', 'DELETE', 'GET'])
@permission_classes([IsAuthenticated])
def followUser(request):
    followerID = request.user
    followed = request.data.get("username")
    followedUser = USER.objects.get(username=followed)
    if request.method == 'POST':
        userfollows = FOLLOWUSER.objects.create(
            followed=followedUser,
            follower=followerID,
        )
        userfollows.save()
        content = {
            "User has been followed."
        }
        return Response(content)

    if request.method == 'DELETE':
        userfollows = FOLLOWUSER.objects.get(
            followed=followedUser,
            follower=followerID,
        )
        userfollows.delete()
        content = {
            "User has been unfollowed."
        }
        return Response(content)

    return Response({"error: Could not follow user."}, status=400)


@api_view(['GET'])
def getFollowers(request, user):
    if request.method == 'GET':
        user_obj = USER.objects.filter(username=user).first()
        count = user_obj.followers.count()
        return Response({'followers': count})


@api_view(['GET'])
def getFavorites(request, user):
    if request.method == 'GET':
        user_obj = USER.objects.filter(username=user).first()
        games = FAVORITES.objects.filter(userID=user_obj)
        content = gameSerializer(games, many=True).data
        return Response(content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkFavorites(request, id: int):
    user = request.user
    exists = FAVORITES.objects.filter(userID=user, gameID=id).exists()
    if exists:
        return Response(True, status=200)
    else:
        return Response(False, status=200)