from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from category.models import Category
from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer


class ListRestaurantView(ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    search_fields = ['name', 'country', 'city']
    filter_backends = (filters.SearchFilter,)


class CreateRestaurantView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def perform_create(self, serializer):
        category_id = self.request.data['category']
        category = Category.objects.filter(id=category_id)
        category_title = category[0]
        serializer.save(user=self.request.user, category=category_title)
        return serializer


class ListRestaurantsByCategory(ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field_kwarg = 'category_id'

    def get_queryset(self):
        restaurants = Restaurant.objects.filter(category_id=self.kwargs['category_id'])
        return restaurants

    def get_queryset(self, **kwargs):
        restaurants = Restaurant.objects.filter(category_id=self.kwargs['category_id'])
        return restaurants

    search_fields = ['name', 'country', 'city']
    filter_backends = (filters.SearchFilter,)


class ListRestaurantsByUser(ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field_kwarg = 'user_id'

    def get_queryset(self):
        restaurants = Restaurant.objects.filter(user_id=self.kwargs['user_id'])
        return restaurants

    search_fields = ['user']
    filter_backends = (filters.SearchFilter,)


class RestrieveUpdateDestroyRestaurantView(RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field_kwarg = 'pk'

    http_method_names = ['get', 'patch', 'delete']

    def get_permissions(self):
        if self.request and self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
