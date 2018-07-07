from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from blog.views import *
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token
from djangoAngular import settings, local_settings

router = DefaultRouter()
router.register(r'responsive-image', ResponsiveImageViewSet)
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/auth/', obtain_jwt_token),
    url(r'^api/', include(router.urls)),
] + static(local_settings.MEDIA_URL, document_root=local_settings.MEDIA_ROOT)
