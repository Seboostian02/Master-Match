from rest_framework import serializers
from .models import Training

class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = ('id', 'name', 'skill_id', 'expert_id', 'description', 'number_of_participants')