from django.urls import path
from .views import ExpertListView, ExpertDetailView, ExpertSkillUpdateView

urlpatterns = [
    path('experts/', ExpertListView.as_view(), name='expert-list'),
    path('experts/<int:pk>/', ExpertDetailView.as_view(), name='expert-detail'),
    path('update-expert-skills/', ExpertSkillUpdateView.as_view(), name='update-student-skills'),
]
