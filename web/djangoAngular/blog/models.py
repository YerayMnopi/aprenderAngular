import io, os
from PIL import Image
from django.core.files.base import ContentFile
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
from django.db.models.signals import post_delete
from django.dispatch import receiver
from djangoAngular.mixins import UpdateableMixin, SlugeableMixin
from django.utils import timezone


class ResponsiveImage(UpdateableMixin, SlugeableMixin):
    type = models.CharField(max_length=250, default=None, blank=True)
    author = models.CharField(max_length=250, default=None, blank=True)
    caption = models.CharField(max_length=100, default=None, blank=True)
    alt = models.CharField(max_length=100, default=None, blank=True)
    width = models.PositiveIntegerField(default=0)
    height = models.PositiveIntegerField(default=0)
    image = models.ImageField(
        upload_to='images/',
        blank=False,
    )
    phone = models.ImageField(
        upload_to='images/',
        default=None,
        blank=True
    )
    phone_portrait = models.ImageField(
        upload_to='images/',
        default=None,
        blank=True
    )
    tablet = models.ImageField(
        upload_to='images/',
        default=None,
        blank=True
    )
    tablet_portrait = models.ImageField(
        upload_to='images/',
        default=None,
        blank=True
    )
    desktop = models.ImageField(
        upload_to='images/',
        default=None,
        blank=True
    )

    def save(self):
        if not self.slug:
            self.slug = self.get_unique_slug()

        if not self.image:
            return super(ResponsiveImage, self).save()

        image = Image.open(io.BytesIO(self.image.read()))

        self.remove_previous()

        self.width, self.height = image.size
        self.image.save(
            name=self.rename(),
            content=self.resize(image, max(self.width, self.height)),
            save=False
        )

        self.phone.save(
            name=self.rename('-phone'),
            content=self.resize(image, 767, 192),
            save=False
        )

        self.phone_portrait.save(
            name=self.rename('-phone-portrait'),
            content=self.crop_portrait(image, 767, 192),
            save=False
        )

        self.tablet.save(
            name=self.rename('-tablet'),
            content=self.resize(image, 1024, 192),
            save=False
        )

        self.tablet_portrait.save(
            name=self.rename('-tablet-portrait'),
            content=self.crop_portrait(image, 1024, 192),
            save=False
        )

        self.desktop.save(
            name=self.rename('-desktop'),
            content=self.resize(image, 1800, 192),
            save=False
        )

        super(ResponsiveImage, self).save()
        os.remove(self.image.path)

    def rename(self, extra_string=''):
        return self.slug + extra_string + '.jpg'

    def remove_previous(self):
        if self.phone.name and not self.image.name in self.phone.name:
            if os.path.isfile(self.phone.path):
                os.remove(self.phone.path)
                os.remove(self.phone.path.replace('-phone', ''))
                os.remove(self.phone.path.replace('-phone', '-phone-portrait'))
                os.remove(self.phone.path.replace('-phone', '-tablet'))
                os.remove(self.phone.path.replace('-phone', '-tablet-portrait'))
                os.remove(self.phone.path.replace('-phone', '-desktop'))

    def resize(self, image, edge, dpi=72):
        content = io.BytesIO()
        image.resize(self.scale(edge), Image.ANTIALIAS).save(
            fp=content,
            format='JPEG',
            dpi=[dpi, dpi],
            optimize=True,
            quality=85
        )
        return ContentFile(content.getvalue())

    def crop_portrait(self, image, edge, dpi=72):

        resized_image = image.resize(self.scale(edge * 1.5), Image.ANTIALIAS)

        content = io.BytesIO()
        left = (resized_image.width/6) * 1.5
        right = (resized_image.width/6) * 4.5
        up = 0
        down = resized_image.height

        resized_image.crop((left, up, right, down)).save(
            fp=content,
            format='JPEG',
            dpi=[dpi, dpi],
            optimize=True,
            quality=85,
        )
        return ContentFile(content.getvalue())

    def scale(self, long_edge):
        if self.width > self.height:
            ratio = long_edge * 1. / self.width
        else:
            ratio = long_edge * 1. / self.height
        return int(self.width * ratio), int(self.height * ratio)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.title


class Category(SlugeableMixin):
    description = models.CharField(max_length=250)
    image = models.ForeignKey(ResponsiveImage, related_name='categories')

    def __str__(self):
        return self.title


class Post(UpdateableMixin, SlugeableMixin):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    description = models.CharField(max_length=250)
    image = models.ForeignKey(ResponsiveImage, related_name='posts')
    author = models.ForeignKey(User, related_name='posts')
    body = JSONField(default={"body": []})
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='draft')
    publish = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(Category, default=1, related_name='posts')

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title


@receiver(post_delete, sender=ResponsiveImage)
def responsive_image_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.phone.delete(False)
    instance.phone_portrait.delete(False)
    instance.tablet.delete(False)
    instance.tablet_portrait.delete(False)
    instance.desktop.delete(False)
