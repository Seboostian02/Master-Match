# Generated by Django 5.0.7 on 2024-08-07 07:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exp', '0002_alter_expert_skill'),
        ('skills', '0003_auto_20240806_1418'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expert',
            name='skill',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skills.skill'),
        ),
    ]
