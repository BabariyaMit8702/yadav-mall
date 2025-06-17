from django.contrib import admin

# Register your models here.
from .models import product,contect,orders

admin.site.register(product)
admin.site.register(contect)
admin.site.register(orders)