from django.db import models
from users.models import User 
from skills.models import Skill

class Expert(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    skill_id = models.ForeignKey(Skill, on_delete=models.CASCADE, null=True, blank=True, default=None)
  
    def __str__(self):
        return str(self.id)