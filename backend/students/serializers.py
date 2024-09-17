from rest_framework import serializers

from skills.models import Skill
from users.models import User
from .models import Student

class SkillsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ('id', 'user','name','skill_id')

    def get_name(self, obj):
        return obj.user.name
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'user', 'skill_id')

class SkillListSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    skills = serializers.ListField(child=serializers.IntegerField())

    def validate(self, data):
        user_id = data.get('user_id')
        skills = data.get('skills')

        # Verifică dacă utilizatorul există
        if not User.objects.filter(id=user_id).exists():
            raise serializers.ValidationError("User does not exist")

        # Verifică dacă toate skill-urile există
        invalid_skills = [skill_id for skill_id in skills if not Skill.objects.filter(id=skill_id).exists()]
        if invalid_skills:
            raise serializers.ValidationError(f"Invalid skill IDs: {invalid_skills}")

        return data