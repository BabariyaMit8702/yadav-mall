
from pathlib import Path

import os
import dj_database_url


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
#SECRET_KEY = 'django-insecure-e(t+sxb98a&1j8=_(7yd)g1xg7d)=+kmqe)&b1a*^(w8$(0#u3'
SECRET_KEY = os.getenv("SECRET_KEY", "fc9eaa90efc8638d66ccb6341e3b168b")

# SECURITY WARNING: don't run with debug turned on in production!
#DEBUG = True
DEBUG = os.getenv("DEBUG", "False") == "True"

#ALLOWED_HOSTS = ['*']
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")

#os.environ.get('ALLOWED_HOSTS','').split(',')

#CLOUDINARY_URL = cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUDINARY_URL='cloudinary://<your_api_key>:<your_api_secret>@de4yvnf2p'

CLOUDINARY_URL = os.getenv("cloudinary://<your_api_key>:<your_api_secret>@de4yvnf2p")

# Application definition


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ecwapp',
    'rest_framework',
    'django_filters',
    "cloudinary",
    "cloudinary_storage",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ecw.urls' 

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR / 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ecw.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'ecom_project',
#         'USER': 'yadav',
#         'PASSWORD': 'parth.priyanshu',
#         'HOST': '127.0.0.1',
#         'PORT': '3306',
#         'OPTIONS': {
#             'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
#         }
#     }
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'the_ecom',           
#         'USER': 'yadav',         
#         'PASSWORD': 'parth.priyanshu', 
#         'HOST': '127.0.0.1',        
#         'PORT': '5432',            
#     }
# }

# DATABASES = {
#     "default": dj_database_url.parse(
#         os.getenv("DATABASE_URL"),
#         conn_max_age=600
#     ) if os.getenv("DATABASE_URL") else {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }

import dj_database_url
DATABASES = {
    "default": dj_database_url.config(default="postgresql://first_host_user:zjifcvwBt7DjfO2N4zbPCj5d5IqRX8xl@dpg-d326c2ndiees738hcnu0-a.singapore-postgres.render.com/first_host")
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
#STATICFILES_DIRS = [
 #  BASE_DIR / "static",  # yeh folder aapke project ke root mein hona chahiye
#]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]


STATIC_ROOT = BASE_DIR / "staticfiles"
# MEDIA_ROOT = os.path.join(BASE_DIR,'media')
# MEDIA_URL = '/media/'

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),      
    'REFRESH_TOKEN_LIFETIME': timedelta(days=10),     
    'ROTATE_REFRESH_TOKENS': False                  
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
