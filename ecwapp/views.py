from django.shortcuts import render,HttpResponse,redirect
from .models import product,contect,orders
from math import ceil
from django.db.models import Q
import uuid

# Create your views here.
'''
def home(request):
    

    products = []
    catprods = product.objects.values('category','id')
    cats = {items['category'] for items in catprods}
    
    for cat in cats:
        prod = product.objects.filter(category=cat)
        n = len(prod)
        nslides = n//4 + ceil((n/4)-(n//4))
        products.append([prod,nslides,range(1,nslides)])

        
    
    
    parameters = {'products':products}
    return render(request,"homepage.html",parameters)
'''
def home(request):
    query = request.GET.get('query', '').strip()  # search query

    products = []

    if query:
        # filter products jisme product_name, category ya desc me query ka partial case-insensitive match ho
        filtered_products = product.objects.filter(
            Q(product_name__icontains=query) | 
            Q(category__icontains=query) | 
            Q(desc__icontains=query)
        )

        # unique categories from filtered products
        cats = filtered_products.values_list('category', flat=True).distinct()

        for cat in cats:
            prod = filtered_products.filter(category=cat)
            n = len(prod)
            nslides = n // 4 + ceil((n / 4) - (n // 4))
            products.append([prod, nslides, range(1, nslides + 1)])
    else:
        catprods = product.objects.values('category', 'id')
        cats = {items['category'] for items in catprods}

        for cat in cats:
            prod = product.objects.filter(category=cat)
            n = len(prod)
            nslides = n // 4 + ceil((n / 4) - (n // 4))
            products.append([prod, nslides, range(1, nslides + 1)])  # corrected range end
            
    parameters = {'products': products}
    return render(request, "homepage.html", parameters)

def about(request):
    return render(request,"about.html")

def contectpage(request):
    return render(request,"contect.html")

def scf(request):
    if(request.method=="POST"):
        name = request.POST.get("name","")
        email = request.POST.get("email","")
        phone_no = request.POST.get("phone_no","")
        query = request.POST.get("query","")
        ct = contect(name=name, email=email, phone_no=phone_no, query=query)
        ct.save()

    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        # Process the data (save to DB, etc.)
        return redirect('/return_from_contect/')

def cth(request):
    return render(request,"contect_to_homepage.html")

def productview(request,myid):
    currunt_product = product.objects.filter(id=myid)
    cp = {
        'currunt_product':currunt_product[0]
    }
    return render(request,"productview.html",cp) 

def showcart(request):
    return render(request,"showcart.html")

def reod(request):
    
    if(request.method=="POST"):    
        selected_items = request.POST.get("selected_items")
        total_amount = request.POST.get("total_amount")    
        name = request.POST.get("fullname")
        phone_no = request.POST.get("phone")
        address = request.POST.get("address")
        city = request.POST.get("CT")
        zip_code = request.POST.get("zip_code")
        payment_method = request.POST.get("payment")

        od = orders(selected_items=selected_items,total_amount=total_amount,name=name,phone_no=phone_no,address=address,city=city,zip_code=zip_code,payment_method=payment_method)
        od.save()
        
    if(request.method=="POST"):
        #zip_code = request.POST.get("zip_code")
        pm = request.POST.get("payment")
        if(pm=="cash_on_delivery"): 
            return redirect("/thnx/")
        elif(pm=="upi"):
            payble_amount = request.POST.get("total_amount")
            txn_id = str(uuid.uuid4())
            upi_id = "7861035305@fam"
            upi_url = f"upi://pay?pa={upi_id}&pn=YourName&tid={txn_id}&tr={txn_id}&tn=Order%20Payment&am={payble_amount}&cu=INR"
            return render(request,"payment.html",{'upi_url': upi_url})

def thnx(request):
    return render(request,"thnx.html")

def bs(request):
    return render(request,'base.html')