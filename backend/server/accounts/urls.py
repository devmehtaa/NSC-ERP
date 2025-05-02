from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('register/',views.register_user , name='register_user'),
    path('logout/', views.logout_view, name='logout'),
    path('login/', views.login_view, name='login'),
    path('check_login/', views.check_login, name='check_login'),

    #contact person views
    path('contactpersons/', views.contact_person_list, name='contact_person_list'),
    path('contactpersons/<int:pk>/', views.contact_person_detail, name='contact_person_detail'),
    
    # Product routes
    path('products/', views.product_list, name='product_list'),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    
    # Supplier routes
    path('suppliers/', views.supplier_list, name='supplier_list'),
    path('suppliers/<int:pk>/', views.supplier_detail, name='supplier_detail'),
]