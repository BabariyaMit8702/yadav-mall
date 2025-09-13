from django.db import models
from django.contrib.auth.models import User


class product(models.Model):
    product_id = models.AutoField 
    product_name = models.CharField(max_length=20)
    category = models.CharField(max_length=20,default="")                   
    sub_category = models.CharField(max_length=20,default="")
    price = models.IntegerField(default=0)          
    desc = models.CharField(max_length=300)
    publicate_data = models.DateField()
    image = models.ImageField(upload_to="imgs_two/",default="")

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
    phone_no = models.CharField(max_length=15,default="")
    address = models.CharField(max_length=300,default="")
    city = models.CharField(max_length=30,default="")
    zip_code = models.CharField(max_length=10,default="")
    payment_method = models.CharField(max_length=50,default="")

    def __str__(self):
        return self.name
    
class UpiTransaction(models.Model):
    txn_id = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default="PENDING") 
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50,default="")
    verify = models.CharField(max_length=50,default="")
 
    def __str__(self):
        return self.txn_id

class profile(models.Model):
    profile_id = models.AutoField(primary_key=True)
    onwer = models.OneToOneField(User,on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to="imgs_two/",null=True)
    address = models.CharField(max_length=50,default="")
    email = models.CharField(max_length=33,default="")
    phone_no = models.CharField(max_length=15,default="")

    def __str__(self):
        return f'{self.onwer.id}. {self.onwer.username}'
    
class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=30,default="")
    user_name = models.CharField(max_length=30,default="")
    the_review = models.CharField(max_length=50,default="")

    def __str__(self):
        return self.product_name