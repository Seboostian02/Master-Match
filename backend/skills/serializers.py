from rest_framework import serializers
from .models import Skill

class SkillsSerializer(serializers.ModelSerializer):
    number_of_students = serializers.IntegerField(read_only=True)
    number_of_teachers = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Skill
        fields = ('id', 'name', 'description', 'number_of_students', 'number_of_teachers')
