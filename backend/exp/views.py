from django.shortcuts import render
from rest_framework import generics

from exp.models import Expert
from .models import Expert
from .serializers import ExpertSerializer
from skills.models import Skill
from urllib import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class ExpertListView(generics.ListAPIView):
    queryset = Expert.objects.all()
    serializer_class = ExpertSerializer
    
class ExpertDetailView(generics.RetrieveAPIView):
    queryset = Expert.objects.all()
    serializer_class = ExpertSerializer



class ExpertSkillUpdateView(APIView):

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        skill_ids = request.data.get('skills', [])

        if not user_id:
            return response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(skill_ids, list):
            return response({"error": "Skills must be a list"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # stergem user
            Expert.objects.filter(user_id=user_id).delete()

            # dam fetch instante skill-uri
            skills = Skill.objects.filter(id__in=skill_ids)
            if skills.count() != len(skill_ids):
                return Response({"error": "One or more skills are invalid"}, status=status.HTTP_400_BAD_REQUEST)

            # cream inregistrare exp
            new_students = [Expert(user_id=user_id, skill_id=skill) for skill in skills]
            Expert.objects.bulk_create(new_students)

            return Response({"message": "Skills updated successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
