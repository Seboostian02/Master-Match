from django.contrib import admin
from skills.models import Skill
from .models import Question, Answer

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'skill', 'description', 'created_at')
    search_fields = ('description', 'user__id')
    list_filter = ('user', 'skill', 'created_at')

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'question', 'description', 'created_at')
    search_fields = ('description', 'user__id', 'question__description')
    list_filter = ('user', 'question', 'created_at')
