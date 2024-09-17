from django.urls import path, include
from .views import RegisterView, LoginView, LogoutView, UserDetailView, UpdateNameView, UpdateEmailView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('details/', UserDetailView.as_view()),
    path('update-name/', UpdateNameView.as_view(), name='update-name'),
    path('update-email/', UpdateEmailView.as_view(), name='update-email'),
]