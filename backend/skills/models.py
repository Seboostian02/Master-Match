# models.py
from django.db import models
from django.conf import settings

class Skill(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='skills_wanted', blank=True)
    teachers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='skills_taught', blank=True)

    def number_of_students(self):
        return self.students.count()

    def number_of_teachers(self):
        return self.teachers.count()

    def __str__(self):
        return str(self.id)
