from django.db.models import Avg
from rest_framework.generics import ListAPIView

from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer


class Home(ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        restaurants_rated = Restaurant.objects.filter(fk_review_restaurant__rating__gte=1)
        best_rated = restaurants_rated.annotate(avg_rating=Avg('fk_review_restaurant__rating')).order_by('-avg_rating')[: 4]
        return best_rated
