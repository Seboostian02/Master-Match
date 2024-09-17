from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include("users.urls")),
    path('exp/', include("exp.urls")),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('skills/', include('skills.urls')),
    path('trainings/', include('trainings.urls')), 
    path('students/', include('students.urls')), 
    path('question_answer/', include('question_answer.urls')),
]