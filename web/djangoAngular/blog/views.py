from rest_framework import viewsets
from django.contrib.auth.models import User
from blog.serializers import PostSerializer, UserSerializer
from blog.models import Post


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
