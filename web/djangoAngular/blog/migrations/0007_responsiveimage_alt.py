# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-04-21 01:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_auto_20180421_0109'),
    ]

    operations = [
        migrations.AddField(
            model_name='responsiveimage',
            name='alt',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
    ]
