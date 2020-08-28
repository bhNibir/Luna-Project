from django.urls import path

from likereviews.views import CreateLikeReview

urlpatterns = [
    path(
        '<review_id>/', CreateLikeReview.as_view()
    )
]
