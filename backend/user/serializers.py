from rest_framework import serializers

from user.models import User


class UserSerializer(serializers.ModelSerializer):
    count_reviews = serializers.SerializerMethodField()
    count_comments = serializers.SerializerMethodField()

    def get_count_reviews(self, review):
        return review.fk_review_user.all().count()

    def get_count_comments(self, comment):
        return comment.fk_comment_user.all().count()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'location', 'phone', 'description', 'things_i_love', 'joined_date', 'profile_picture', 'count_reviews', 'count_comments']


class UserRegistration(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'code', 'username', 'location', 'password', 'password_repeat']
