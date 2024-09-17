from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer, LogoutSerializer, UpdateNameSerializer, UpdateEmailSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, AllowAny
import json 
from exp.models import Expert 
from students.models import Student
from skills.models import Skill

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)

        d = json.dumps(request.data)
        jobject = json.loads(d)
        for val in jobject['skills']:
            if (val['selected'] == True):
                skill = Skill.objects.get(name=val['name'])
                if (val['IsExpert'] == True):
                    skill.teachers.add(user)
                    Expert.objects.create(user=user,skill_id=skill)
                else:
                    skill.students.add(user)
                    Student.objects.create(user=user,skill_id=skill)

        return Response({
            'token': token.key
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request):
        try:
            key = request.META.get('HTTP_AUTHORIZATION')
            token = key.split(' ')[1]
            token_obj = Token.objects.get(key=token)
            token_obj.delete()

            return Response(status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class UserDetailView(generics.GenericAPIView):
    
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)
    
'''class UserDetailModify(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

   
    def post(self, request, *args, **kwargs):
        email = request.POST.get('email')
        user_id = request.POST.get('user_id')

        if email and user_id:
            try:
                user = User.objects.get(pk=user_id)
                user.email = email
                user.save()
                return Response('Email updated successfully')
            except User.DoesNotExist:
                return Response('User not found')
        else:
            return Response('Invalid data')'''

class UpdateNameView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateNameSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class UpdateEmailView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateEmailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

