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
    path('thnx/',views.thnx,name="thankU"),
    path('img/',views.bs),
    path('cbv/',views.rd.as_view()),
    path('cj/',views.Imit.as_view())
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

