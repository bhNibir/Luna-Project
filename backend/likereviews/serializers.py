from rest_framework import serializers

from likereviews.models import LikeReview


class LikeReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = LikeReview
        fields = '__all__'
