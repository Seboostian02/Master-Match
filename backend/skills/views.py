from django.shortcuts import render, get_object_or_404
from .models import Skill
from .serializers import SkillsSerializer
from rest_framework import generics

def index(request):
    return render(request, 'skills/index.html')

def skill_list(request):
    skills = Skill.objects.all()
    return render(request, 'skills/skill_list.html', {'skills': skills})

def skill_detail(request, pk):
    skill = get_object_or_404(Skill, pk=pk)
    return render(request, 'skills/skill_detail.html', {'skill': skill})

class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillsSerializer

class SkillDetailView(generics.RetrieveAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillsSerializer
    lookup_field = 'id'