from django.urls import path

from review.views import CreateReview, ListReviewByRestaurant, ListReviewByID, ListReviewsLiked, ListReviewByUser, ListReview


urlpatterns = [
    path('', ListReview.as_view()),
    path('<int:id>/', ListReviewByID.as_view()),
    path('user/<int:user_id>/', ListReviewByUser.as_view()),
    path('new/<int:restaurant_id>/', CreateReview.as_view()),
    path('restaurant/<int:restaurant_id>/', ListReviewByRestaurant.as_view()),
    path('likes/', ListReviewsLiked.as_view())
]
