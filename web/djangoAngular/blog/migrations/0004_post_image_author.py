# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-17 14:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20180317_1355'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image_author',
            field=models.CharField(default='fgdfg', max_length=250),
            preserve_default=False,
        ),
    ]