from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name','skill_id')
    search_fields = ('user__email','name', 'id')
    list_filter = ('skill_id',)  

    def name(self, obj):
        return obj.user.name