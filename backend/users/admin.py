from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password','name')}),
        ('Permissions', {'fields': (
            'is_staff', 
            'is_superuser',
            'groups', 
            'user_permissions',
        )}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': ('email', 'password1', 'password2','name')
            }
        ),
    )

    list_display = ('email', 'name','is_staff',)
    list_filter = ('is_staff', 'is_superuser', 'groups',)
    search_fields = ('email',)
    ordering = ('email','name',)
    filter_horizontal = ('groups', 'user_permissions',)


admin.site.register(User, UserAdmin)