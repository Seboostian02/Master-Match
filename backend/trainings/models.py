from django.db import models
from users.models import User 
from skills.models import Skill
from exp.models import Expert

class Training(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    expert = models.ForeignKey(Expert, on_delete=models.CASCADE)
    description = models.TextField()
    number_of_participants = models.PositiveIntegerField()

    def __str__(self):
        return f"Training on {self.skill} by {self.expert}"
    