from django.urls import path

from category.views import ListCreateCategoryView

urlpatterns = [
    path('', ListCreateCategoryView.as_view()),
]
