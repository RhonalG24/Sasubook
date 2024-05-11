from rest_framework.exceptions import AuthenticationFailed
from sasubook.serializers import JWTSerializer
from sasubook_api.settings import SECRET_KEY
import jwt, datetime

def create_token(user):
    payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def get_payload(request):
    jwtSerializer = JWTSerializer(data=request.data)
    if jwtSerializer.is_valid():

        token = jwtSerializer.validated_data['jwt']
        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        except jwt.DecodeError:
            raise AuthenticationFailed('Unauthenticated!')
        else:
            # print(payload)
            return payload

def get_payload_from_GET_request(request):
    token = request.GET.get('jwt')
    # jwtSerializer = JWTSerializer(data=request.data)
    if token is not None:

        # print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        except jwt.DecodeError:
            raise AuthenticationFailed('Unauthenticated!')
        else:
            # print(payload)
            return payload
