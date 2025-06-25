from django.db import models

# Create your models here.
class product(models.Model):
    product_id = models.AutoField 
    product_name = models.CharField(max_length=20)
    category = models.CharField(max_length=20,default="")                   
    sub_category = models.CharField(max_length=20,default="")
    price = models.IntegerField(default=0)          
    desc = models.CharField(max_length=300)
    publicate_data = models.DateField()
    image = models.ImageField(upload_to="myimages/",default="")

    def __str__(self):
        return self.product_name
    
class contect(models.Model):
    msg_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20,default="")
    email = models.CharField(max_length=25,default="")
    phone_no = models.CharField(max_length=15,default="")
    query = models.CharField(max_length=200,default="")

    def __str__(self):
        return self.name


class orders(models.Model):
    order_id = models.AutoField(primary_key=True)
    selected_items = models.CharField(max_length=300,default="")
    total_amount = models.IntegerField(default=0)
    name = models.CharField(max_length=20,default="")
    phone_no = models.CharField(max_length=10,default="")
    address = models.CharField(max_length=300,default="")
    city = models.CharField(max_length=30,default="")
    zip_code = models.CharField(max_length=10,default="")
    payment_method = models.CharField(max_length=50,default="")

    def __str__(self):
        return self.name