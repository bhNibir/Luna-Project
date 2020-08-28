from django.db.models import Avg
from rest_framework import serializers

from category.serializers import CategorySerializer
from restaurant.models import Restaurant
from user.serializers import UserSerializer


class RestaurantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    count_reviews = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    def get_count_reviews(self, review):
        return review.fk_review_restaurant.all().count()

    def get_rating(self, restaurant):
        restaurant_review = restaurant.fk_review_restaurant.all().aggregate(Avg('rating'))
        return restaurant_review

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'country', 'street', 'city', 'zip', 'website', 'phone', 'email', 'opening_hours', 'price_level', 'image', 'user', 'rating', 'category', 'count_reviews']
