# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-12-25 13:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0013_post_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='responsiveimage',
            name='portrait',
            field=models.ImageField(blank=True, default=None, upload_to='images/'),
        ),
    ]