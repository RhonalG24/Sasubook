from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    name = data['name'].strip()
    password = data['password'].strip()
    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('El email ingresado ya existe en el sistema')
    ##
    if not password or len(password) < 8:
        raise ValidationError('La contraseña debe contener como mínimo 8 caracteres')
    ##
    if not name:
        raise ValidationError('Ingrese un nombre')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('an email is needed')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('choose another username')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True