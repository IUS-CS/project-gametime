from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def healthCheck(request):
    print("here")
    return Response({"message":"The backend is connected to the button"}, status=200)
