# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-07-10 23:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_auto_20180421_1226'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default=None, max_length=250)),
                ('slug', models.SlugField(blank=True, default=None, max_length=250, unique=True)),
                ('description', models.CharField(max_length=250)),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='blog.ResponsiveImage')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
