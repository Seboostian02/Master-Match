from rest_framework import serializers
from .models import Expert

class ExpertSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Expert
        fields = ('id', 'user', 'name','skill_id')

    def get_name(self, obj):
        return obj.user.name