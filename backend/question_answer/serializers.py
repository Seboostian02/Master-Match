from rest_framework import serializers
from .models import Question, Answer
from skills.models import Skill


class QuestionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  
    skill = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all())  

    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())  

    class Meta:
        model = Answer
        fields = '__all__'
