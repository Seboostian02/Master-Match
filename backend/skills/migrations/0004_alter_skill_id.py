# Generated by Django 5.0.7 on 2024-08-07 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0003_auto_20240806_1418'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
