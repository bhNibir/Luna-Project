"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path('backend/api/docs/', include_docs_urls(title='Luna Backend', public=True, permission_classes=[])),
    path('backend/api/home/', include('home.urls')),
    path('backend/api/registration/', include('registration.urls')),
    path('backend/api/reviews/like/', include('likereviews.urls')),
    path('backend/api/users/', include('user.urls')),
    path('backend/api/reviews/', include('review.urls')),
    path('backend/api/comments/', include('comment.urls')),
    path('backend/api/restaurants/', include('restaurant.urls')),
    path('backend/api/category/', include('category.urls')),
    path('backend/api/auth/token/', jwt_views.TokenObtainPairView.as_view()),
    path('backend/api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view()),
    path('backend/api/auth/token/verify/', jwt_views.TokenVerifyView.as_view()),
]
