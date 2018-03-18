from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
from djangoAngular.mixins import UpdateableMixin


class Post(UpdateableMixin):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    image_author = models.CharField(max_length=250)
    image = models.ImageField(upload_to='images')
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    author = models.ForeignKey(User, related_name='posts')
    body = JSONField(default={"body": []})
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='draft')

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title
