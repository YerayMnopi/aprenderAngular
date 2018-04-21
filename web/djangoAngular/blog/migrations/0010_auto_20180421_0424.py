# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-04-21 04:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_auto_20180421_0422'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(blank=True, default=None, max_length=250, unique=True),
        ),
        migrations.AlterField(
            model_name='responsiveimage',
            name='slug',
            field=models.SlugField(blank=True, default=None, max_length=250, unique=True),
        ),
    ]
