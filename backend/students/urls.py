from django.contrib import admin
from django.urls import path
from .views import StudentListView, StudentDetailView, StudentSkillUpdateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('students/', StudentListView.as_view(), name='student-list-api'),
    path('students/<int:id>/', StudentDetailView.as_view(), name='student-detail-api'),
    path('update-student-skills/', StudentSkillUpdateView.as_view(), name='update-student-skills'),

]
