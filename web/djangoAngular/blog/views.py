from django.contrib.auth.models import User
from blog.serializers import *
from blog.models import *

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


class ResponsiveImageViewSet(viewsets.ModelViewSet):
    queryset = ResponsiveImage.objects.all()
    serializer_class = ResponsiveImageSerializer
    lookup_field = 'slug'


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

    @action(detail=False)
    def published(self, request):
        queryset = Post.objects.filter(status='published')
        serializer = PostPreviewSerializer(queryset, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
