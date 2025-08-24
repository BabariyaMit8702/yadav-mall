from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages
from .models import product,contect,orders,UpiTransaction,profile
from math import ceil
from django.db.models import Q
import uuid
from django.views import View
from django.views.generic import TemplateView,RedirectView
import qrcode
from io import BytesIO
import base64
from urllib.parse import unquote_plus
from django.contrib.auth.models import User
from .serializers import profile_Serializer
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def home(request):
    query = request.GET.get('query', '').strip()  
    catagory_buttons = request.GET.get('catagory_buttons','').strip()
    catagory_buttons = unquote_plus(catagory_buttons)
    products = []
    n_of_slides = int(request.GET.get('itm',4))

    if query:
        filtered_products = product.objects.filter(
        Q(product_name__icontains=query) | 
        Q(category__icontains=query) | 
        Q(desc__icontains=query)
        )

        cats = filtered_products.values_list('category', flat=True).distinct()

        for cat in cats:
             prod = filtered_products.filter(category=cat)
             n = len(prod)
             nslides = ceil(n / n_of_slides)
             products.append([prod, nslides, range(1, nslides)])
    elif catagory_buttons:
        prod = product.objects.filter(category=catagory_buttons)
        n = len(prod)
        nslides = ceil(n / n_of_slides)
        products.append([prod,nslides,range(1,nslides)])
        
    else:
        cats = product.objects.values_list('category', flat=True).distinct()


        for cat in cats:
            prod = product.objects.filter(category=cat)
            n = len(prod)
            nslides = ceil(n / n_of_slides)
            products.append([prod, nslides, range(1, nslides)]) 
    
    for_catl = product.objects.all()
    catlist = []
    for i in for_catl:
        catlist.append(i.category)
    setlist = set(catlist)
            
    parameters = {'products': products,'setlist':setlist,'ns':n_of_slides}
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
            upi_id = "gpay-11262978705@okbizaxis"
            upi_url = f"upi://pay?pa={upi_id}&pn=YourName&tid={txn_id}&tr={txn_id}&tn=Order%20Payment&am={payble_amount}&cu=INR"
            
            # UPI payment URL
            upi_url = f"upi://pay?pa={upi_id}&pn=YourName&tid={txn_id}&tr={txn_id}&tn=Order%20Payment&am={payble_amount}&cu=INR"


            UpiTransaction.objects.create(txn_id=txn_id, amount=payble_amount)

            qr = qrcode.make(upi_url)
            buffered = BytesIO()
            qr.save(buffered, format="PNG")
            qr_img = base64.b64encode(buffered.getvalue()).decode()

            return render(request, "payment.html", {
                "upi_url": upi_url,
                "qr_img": qr_img,
                "txn_id": txn_id,
                "amount": payble_amount,
            })

        return render(request,"payment.html",{'upi_url': upi_url})

def thnx(request):
    return render(request,"thnx.html")

def bs(request):
    return render(request,'random_image.html')

def signup(request):
    return render(request,'signup.html')

def login(request):
    return render(request,'login.html')

def app(request):
    return HttpResponse('THE APP')

def signup_process(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email_id = request.POST.get('email','')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            messages.error(request,'USERNAME ALREADY EXISTS')
            return redirect('/app/signup/')
        
        usersaveing = User.objects.create_user(username=username,email=email_id,password=password)
        usersaveing.save()
        return redirect('/app/success/')
    
def log_after_sign(request):
    return render(request,'sign+log.html')

def profile_page(request):
    return render(request,'profile_page.html')


class profile_info(viewsets.ViewSet):
    
    def retrieve(self,request,pk=None):
        permission_class = [IsAuthenticated]
        the_onwer = profile.objects.get(pk=pk)
        serializer = profile_Serializer(the_onwer)
        return Response(serializer.data)
    
    def update(self,request,pk=None):
        permission_classes = [IsAuthenticated]
        the_onwer = profile.objects.get(pk=pk)
        serializer = profile_Serializer(the_onwer,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self,request,pk=None):
        permission_classes = [IsAuthenticated]
        the_onwer = profile.objects.get(pk=pk)
        serializer = profile_Serializer(the_onwer,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_101_SWITCHING_PROTOCOLS)
