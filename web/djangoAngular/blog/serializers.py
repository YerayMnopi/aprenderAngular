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
    id = serializers.ReadOnlyField()
    image = ResponsiveImageSerializer()

    class Meta:
        model = Post
        fields = '__all__'
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class ThumbnailSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ResponsiveImage
        fields = ['thumbnail']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class CategorySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Category
        fields = ['slug']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class PostPreviewSerializer(serializers.HyperlinkedModelSerializer):

    image = ThumbnailSerializer()
    #category = CategorySerializer()

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'slug', 'image']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
