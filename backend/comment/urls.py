from django.urls import path

from comment.views import ListCommentByUser, CreateComment, DeleteComment, ListReviewCommentedByUser

urlpatterns = [
    path('user/<int:user_id>/', ListCommentByUser.as_view()),
    path('new/<int:review_id>/', CreateComment.as_view()),
    path('<int:comment_id>/', DeleteComment.as_view()),
    path('', ListReviewCommentedByUser.as_view())
]
