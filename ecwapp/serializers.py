from rest_framework import serializers
from .models import profile,Review,orders
from django.contrib.auth.models import User

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class profile_Serializer(serializers.ModelSerializer):
    class Meta:
        model = profile
        fields = '__all__'

class reviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class orderSerializer(serializers.ModelSerializer):
    class Meta:
        model = orders
        fields = '__all__'