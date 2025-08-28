from django.contrib import admin

# Register your models here.
from .models import product,contect,orders,UpiTransaction,profile,Review

admin.site.register(product)
admin.site.register(contect)
admin.site.register(orders)
admin.site.register(UpiTransaction)
admin.site.register(profile)
admin.site.register(Review)
