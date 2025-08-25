from rest_framework import serializers
from .models import profile
from django.contrib.auth.models import User

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class profile_Serializer(serializers.ModelSerializer):
    class Meta:
        model = profile
        fields = '__all__'