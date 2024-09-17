from django.contrib import admin
from .models import Training

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'skill', 'expert', 'description', 'number_of_participants')
    search_fields = ('id',)
    list_filter = ('skill', 'expert')