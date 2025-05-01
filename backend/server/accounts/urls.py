from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import register_user, logout_view

urlpatterns = [
    path('register/',register_user , name='register_user'),
    path('logout/', logout_view, name='logout')
]