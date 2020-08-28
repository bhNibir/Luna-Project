from rest_framework import filters
from rest_framework.generics import ListCreateAPIView

from category.models import Category
from category.serializers import CategorySerializer


class ListCreateCategoryView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    queryset = queryset.order_by('title')
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
