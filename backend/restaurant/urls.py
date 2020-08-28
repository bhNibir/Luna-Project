from django.urls import path

from restaurant.views import ListRestaurantView, CreateRestaurantView, ListRestaurantsByCategory, ListRestaurantsByUser, RestrieveUpdateDestroyRestaurantView

urlpatterns = [
    path('', ListRestaurantView.as_view()),
    path('new/', CreateRestaurantView.as_view()),
    path('category/<int:category_id>/', ListRestaurantsByCategory.as_view()),
    path('user/<int:user_id>/', ListRestaurantsByUser.as_view()),
    path('<int:pk>/', RestrieveUpdateDestroyRestaurantView.as_view()),
]
