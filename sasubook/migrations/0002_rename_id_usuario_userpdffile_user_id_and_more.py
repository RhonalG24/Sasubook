# Generated by Django 5.0 on 2024-03-06 20:19

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sasubook', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userpdffile',
            old_name='id_usuario',
            new_name='user_id',
        ),
        migrations.AlterField(
            model_name='userpdffile',
            name='file',
            field=models.FileField(blank=True, upload_to='C:\\Users\\Rhona\\OneDrive\\Documents\\Projects\\SasuBook\\public\\generated_files/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])]),
        ),
        migrations.CreateModel(
            name='PdfFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('size', models.CharField(max_length=50)),
                ('file', models.FileField(blank=True, upload_to='C:\\Users\\Rhona\\OneDrive\\Documents\\Projects\\SasuBook/media/pdfs/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])])),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['title'],
            },
        ),
    ]