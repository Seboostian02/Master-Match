from django.shortcuts import render
from rest_framework import generics, status
from .models import Training
from .serializers import TrainingSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import json 
from trainings.models import Training
from skills.models import Skill
from exp.models import Expert
from users.models import User

class TrainingListView(generics.ListAPIView):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    
class TrainingDetailView(generics.RetrieveAPIView):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    permission_classes = [IsAuthenticated]

class TrainingListBySkillView(generics.ListAPIView):
    serializer_class = TrainingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        skill_id = self.kwargs['skill_id']
        return Training.objects.filter(skill_id=skill_id)

class TrainingCreate(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        d = json.dumps(request.data)
        jobject = json.loads(d)
        user_id=jobject['userDetails']
        user=User.objects.get(email=user_id['email'])
        skill_id = Skill.objects.get(id=jobject['id'])
        expert_id=Expert.objects.get(user=user, skill_id=skill_id)
        training=Training.objects.create(name=jobject['title'], description=jobject['description'], expert=expert_id, skill=skill_id, number_of_participants=0)
        
        return Response(status=status.HTTP_200_OK)


class JoinTraining(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        d = json.dumps(request.data)
        jobject = json.loads(d)
        training = Training.objects.get(id=jobject['id'])
        training.number_of_participants = training.number_of_participants + 1
        training.save() 

        return Response(status=status.HTTP_200_OK)
