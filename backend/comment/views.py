from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from comment.models import Comment
from comment.serializers import CommentSerializer
from review.models import Review
from review.serializers import ReviewSerializer


class ListCommentByUser(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'user_id'

    def get_queryset(self, **kwargs):
        comments = Comment.objects.filter(user_id=self.kwargs['user_id'])
        return comments


class CreateComment(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_url_kwarg = "review_id"

    def create(self, request, review_id, **kwargs):
        review = Review.objects.get(id=review_id)
        comment = Comment(user=request.user, review=review, content=request.data['content'])
        comment.save()
        return Response(status=200)


class DeleteComment(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_url_kwarg = "comment_id"



class ListReviewCommentedByUser(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self, **kwargs):
        commented_reviews = Review.objects.filter(fk_comment_review__user_id=self.request.user.id).distinct()
        return commented_reviews
