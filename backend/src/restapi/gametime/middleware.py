from django.http import JsonResponse
from rest_framework.authtoken.models import Token


class GameTimeMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if request.path.startswith('/gametime/user/'):

            auth_header = request.headers.get("Authorization")

            if not auth_header:
                return JsonResponse({"error": "No token provided"}, status=401)

            try:
                prefix, token_key = auth_header.split(" ")

                if prefix != "Token":
                    return JsonResponse({"error": "Invalid token type"}, status=401)

                token = Token.objects.get(key=token_key)

                request.user = token.user

            except Token.DoesNotExist:
                return JsonResponse({"error": "Invalid token"}, status=401)

            except Exception:
                print("hit that")
                return JsonResponse({"error": "Malformed token"}, status=401)

        return self.get_response(request)