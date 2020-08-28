from rest_framework import serializers

from comment.models import Comment
from comment.serializers import CommentSerializer
from restaurant.serializers import RestaurantSerializer
from review.models import Review
from user.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    restaurant = RestaurantSerializer(read_only=True)
    comment = serializers.SerializerMethodField()
    count_likes = serializers.SerializerMethodField()
    count_comments = serializers.SerializerMethodField()

    def get_count_likes(self, review):
        return review.fk_like_review.all().count()

    def get_count_comments(self, comment):
        return comment.fk_comment_review.all().count()

    def get_comment(self, review):
        qs = Comment.objects.filter(review_id=review.id)
        serializer = CommentSerializer(instance=qs, many=True, read_only=True)
        return serializer.data

    class Meta:
        model = Review
        fields = ['id', 'content', 'rating', 'created', 'user', 'restaurant', 'count_likes', 'count_comments', 'comment']
