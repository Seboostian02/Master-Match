from django.urls import path
from .views import index, skill_list, skill_detail, SkillListView, SkillDetailView

urlpatterns = [
    path('', index, name='index'),  # Pagina principală
    path('skills/', skill_list, name='skill-list-html'),  # Pagina HTML cu lista skill-urilor
    path('skills/<int:pk>/', skill_detail, name='skill-detail-html'),  # Pagina HTML cu detalii despre un skill
    path('api/skills/', SkillListView.as_view(), name='skill-list-api'),  # Endpoint API pentru lista skill-urilor
    path('api/skills/<int:id>/', SkillDetailView.as_view(), name='skill-detail-api'),  # Endpoint API pentru detalii despre un skill
]
