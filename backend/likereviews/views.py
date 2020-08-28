from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from likereviews.models import LikeReview
from likereviews.serializers import LikeReviewSerializer


class CreateLikeReview(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LikeReviewSerializer
    queryset = LikeReview.objects.all()

    def post(self, request, review_id, **kwargs):
        likes = LikeReview.objects.filter(
            reviewID=review_id, sender=request.user.id).all()
        if len(likes) == 0:
            serializer = self.get_serializer(
                data={'reviewID': review_id, 'sender': request.user.id})
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            likes[0].delete()
        return Response(status=200)
