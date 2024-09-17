from django.urls import path
from .views import TrainingListView, TrainingDetailView, TrainingListBySkillView, TrainingCreate, JoinTraining

urlpatterns = [
    path('add/', TrainingCreate.as_view(), name='Training-creation'),
    path('training/', TrainingListView.as_view(), name='Training-list'),
    path('training/<int:pk>/', TrainingDetailView.as_view(), name='Training-detail'),
    path('training/<int:skill_id>/', TrainingListBySkillView.as_view(), name='Training-list-by-skill'),
    path('join_training/', JoinTraining.as_view(), name='Join-Training'),
]
