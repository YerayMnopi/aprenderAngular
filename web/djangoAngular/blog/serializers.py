from rest_framework import serializers
from blog.models import *
from django.contrib.auth.models import User


class ResponsiveImageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ResponsiveImage
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class PostSerializer(serializers.HyperlinkedModelSerializer):

    image = ResponsiveImageSerializer()

    class Meta:
        model = Post
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
