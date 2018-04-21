from django.db import models
from django.utils.text import slugify


class UpdateableMixin(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SlugeableMixin(models.Model):
    title = models.CharField(max_length=250, default=None, blank=True)
    slug = models.SlugField(max_length=250, default=None, blank=True, unique=True)

    def get_unique_slug(self):
        slug = slugify(self.title)
        unique_slug = slug
        num = 1
        while self.__class__.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug

    class Meta:
        abstract = True