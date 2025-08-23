from django.urls import path,include
from django.conf import settings
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('',views.app),
    path('signup/',views.signup),
    path('login/',views.login),
    path('api/get-access/',TokenObtainPairView.as_view()),
    path('api/get-refresh/',TokenRefreshView.as_view()),
    ]