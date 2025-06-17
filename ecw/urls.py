"""
URL configuration for ecw project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from ecwapp import views
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home,name="home"),
    path('about/',views.about,name="about"),
    path('submit_contect_form/',views.scf,name="ruko contect"),
    path('return_from_contect/',views.cth,name="bye contectpage"),
    path('contect/',views.contectpage,name="contect"),
    path('products/<int:myid>',views.productview,name="productview"),
    path('showcart/',views.showcart,name="showcart"),
    path('reod/',views.reod,name="reod"),
    path('thnx/',views.thnx,name="thankU")
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

