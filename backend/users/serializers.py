from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from exp.models import Expert  

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = User
        fields = ('id', 'email', 'password','name')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', '')
        )

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)

class LogoutSerializer(serializers.Serializer):
    pass


class UpdateNameSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = User
        fields = ('name',)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    
class UpdateEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ('email',)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance