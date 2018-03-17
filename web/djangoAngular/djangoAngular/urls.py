from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from blog.views import PostViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

from djangoAngular import settings, local_settings
from flights.views import FlightViewSet, CompanyViewSet, AirportViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'airports', AirportViewSet)

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=local_settings.MEDIA_ROOT)
