from rest_framework import serializers
from blog.models import Post
from django.contrib.auth.models import User


class PostSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
