from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

import requests

from .serializers import CreateUserSerializer


CLIENT_ID = "gpfU8x8BZp3sZ2OhWkXe1bJOdoaNagvGoqTGhrgv"


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = CreateUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        url = 'http://127.0.0.1:8000/kitty/token/'
        params = {
                    'grant_type': 'password',
                    'username': request.data['username'],
                    'password': request.data['password'],
                    'client_id': CLIENT_ID,
               }
        data = requests.post(url=url, data=params)
        return Response(data.json())
    return Response(serializer.errors)


@api_view(['POST'])
@permission_classes([AllowAny])
def token(request):
    url = 'http://127.0.0.1:8000/kitty/token/'
    params = {
        'grant_type': 'password',
        'username': request.data['username'],
        'password': request.data['password'],
        'client_id': CLIENT_ID,
    }
    data = requests.post(url=url, data=params)
    return Response(data.json())


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    url = 'http://127.0.0.1:8000/kitty/token/'
    params = {
        'grant_type': 'refresh_token',
        'refresh_token': request.data['refresh_token'],
        'client_id': CLIENT_ID,
    }
    data = requests.post(url=url, data=params)
    return Response(data.json())


@api_view(['POST'])
@permission_classes([AllowAny])
def revoke_token(request):
    url = 'http://127.0.0.1:8000/kitty/revoke_token/'
    params = {
        'token': request.data['token'],
        'client_id': CLIENT_ID,
    }
    data = requests.post(url=url, data=params)
    if data.status_code == requests.codes.ok:
        return Response({'message': 'token revoked'}, data.status_code)
    return Response(data.json(), data.status_code)
