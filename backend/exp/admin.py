from django.contrib import admin
from .models import Expert

@admin.register(Expert)

class ExpertAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'name','skill_id')  
    search_fields = ('user__email','name', 'skill_id')  

    def name(self, obj):
        return obj.user.name