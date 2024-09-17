from rest_framework import generics
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from rest_framework.permissions import IsAuthenticated
import json
from skills.models import Skill
from users.models import User
from rest_framework.response import Response
from rest_framework import generics, status

class QuestionsList(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionCreate(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        d = json.dumps(request.data)
        jobject = json.loads(d)
        user_id=jobject['userDetails']
        user=User.objects.get(email=user_id['email'])
        skill_id = Skill.objects.get(name=jobject['skill'])
        question=Question.objects.create(user=user, description=jobject['description'], skill=skill_id)
        
        return Response(status=status.HTTP_200_OK)

class QuestionDelete(generics.DestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class AnswerListByQuestionView(generics.ListAPIView):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        question_id = self.kwargs['question_id']
        return Answer.objects.filter(question=question_id)

class AnswerDelete(generics.DestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class AnswerCreate(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        d = json.dumps(request.data)
        jobject = json.loads(d)
        user_id=jobject['userDetails']
        user=User.objects.get(email=user_id['email'])
        question = Question.objects.get(id=jobject['id'])
        Answer.objects.create(user=user, description=jobject['newAnswer'], question=question)
        
        return Response(status=status.HTTP_200_OK)
