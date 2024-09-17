from django.contrib import admin
from .models import Skill

@admin.register(Skill)

class SkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description','number_of_students', 'number_of_teachers')
    search_fields = ('name',)
    list_filter = ('students', 'teachers')

#admin.site.register(Skill, SkillAdmin)
