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

    @action(detail=False, methods=['POST'])
    def blank(self, request):
        image = ResponsiveImage.objects.get(slug='footer')
        category = Category.objects.get(slug='angular')
        author = User.objects.get(username='yeray')

        blank_post = Post(
            title='Nuevo Post',
            description='Nueva descripcion post',
            category=category,
            image=image,
            author_id=1,
            status='draft'
        )

        blank_post.save()
        serializer = PostSerializer(blank_post, many=False, context={'request': request})
        return Response(serializer.data)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoriesPostSerializer
    lookup_field = 'slug'
