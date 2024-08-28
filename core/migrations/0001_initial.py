# Generated by Django 5.1 on 2024-08-28 05:06

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CBSItemType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='CoilTubing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date_of_purchase', models.DateField(blank=True)),
                ('date_of_manufacturing', models.DateField(blank=True)),
                ('year_of_import', models.IntegerField()),
                ('length_of_reel', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tonnage', models.DecimalField(decimal_places=2, max_digits=10)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('start_date', models.DateField(db_index=True)),
                ('end_date', models.DateField(db_index=True)),
                ('total_value', models.DecimalField(decimal_places=0, max_digits=16)),
                ('total_value_euro', models.DecimalField(decimal_places=2, max_digits=15)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('syear', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='سال')),
                ('smonth', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='ماه')),
                ('sday', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='روز')),
                ('sdate', models.CharField(blank=True, max_length=50, null=True, verbose_name='تاریخ')),
                ('sdatenumber', models.IntegerField(blank=True, null=True, verbose_name='تاریخ شماری')),
                ('eyear', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='سال')),
                ('emonth', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='ماه')),
                ('eday', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='روز')),
                ('edate', models.CharField(blank=True, max_length=50, null=True, verbose_name='تاریخ')),
                ('edatenumber', models.IntegerField(blank=True, null=True, verbose_name='تاریخ شماری')),
            ],
        ),
        migrations.CreateModel(
            name='ContractType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subcontractor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('contact_person', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('symbol', models.CharField(max_length=10, unique=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='CoilTubingContract',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('coil_tubing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contracts', to='core.coiltubing')),
                ('contract', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='coil_tubings', to='core.contract')),
            ],
        ),
        migrations.CreateModel(
            name='Contractor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=100)),
                ('contact_person', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='contract',
            name='contractor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contracts', to='core.contractor'),
        ),
        migrations.AddField(
            model_name='contract',
            name='contract_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contracts', to='core.contracttype'),
        ),
        migrations.CreateModel(
            name='CBSItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, default='')),
                ('quantity', models.DecimalField(decimal_places=2, default=0.0, max_digits=15)),
                ('unit_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=15)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('cbs_item_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cbs_items', to='core.cbsitemtype')),
                ('contract', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cbs_items', to='core.contract')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.unit')),
            ],
        ),
    ]
