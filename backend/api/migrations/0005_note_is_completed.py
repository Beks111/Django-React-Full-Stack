# Generated by Django 5.2 on 2025-05-20 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_task_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
    ]
