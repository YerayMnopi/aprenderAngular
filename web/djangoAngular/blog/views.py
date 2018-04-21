from rest_framework import viewsets
from django.contrib.auth.models import User
from blog.serializers import *
from blog.models import *


class ResponsiveImageViewSet(viewsets.ModelViewSet):
    queryset = ResponsiveImage.objects.all()
    serializer_class = ResponsiveImageSerializer
    lookup_field = 'slug'


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
