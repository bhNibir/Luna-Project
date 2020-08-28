from random import randint
from django.core.mail import send_mail
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from registration.models import Registration
from registration.serializers import RegistrationSerializer
from user.models import User
from user.serializers import UserRegistration


class RegistrationEmail(GenericAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        code = randint(100000, 999999)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        send_mail(
            'Thank you for registering!',
            'Thank you for registering!\nHere is your validation code: {}'.format(code),
            'students@propulsionacademy.com',
            ['{}'.format(request.data['email'])],
            fail_silently=False,
        )
        serializer.save(code=code)
        return Response(serializer.data)


class RegistrationValidation(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistration

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data['email']
        code = request.data['code']
        password = request.data['password']
        password_repeat = request.data['password_repeat']
        if password == password_repeat:
            try:
                validation = Registration.objects.get(code=code)
                new_user = User(email=email, username=request.data['username'], location=request.data['location'], first_name=request.data['first_name'], last_name=request.data['last_name'])
                new_user.set_password(password)
                new_user.save()
                validation.code = None
                validation.save()
                return Response(status=200)
            except:
                return Response('Code incorrect or email')
        else:
            return Response('Passwords do not match!')
