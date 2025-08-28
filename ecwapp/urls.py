from django.urls import path,include
from django.conf import settings
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'profile-details',views.profile_info,basename='profile-detail')
router.register(r'user_pk',views.my_id , basename='user-info')
router.register(r'review',views.review_api,basename='review-details')

urlpatterns = [
    path('',views.app),
    path('signup/',views.signup),
    path('login/',views.login),
    path('api/get-access/',TokenObtainPairView.as_view()),
    path('api/get-refresh/',TokenRefreshView.as_view()),
    path('signup-process/',views.signup_process),
    path('success/',views.log_after_sign),
    path('profile/',views.profile_page),
    path('edit-profile/',views.put_patch),
    path('custom-apis/',include(router.urls)),
   ]