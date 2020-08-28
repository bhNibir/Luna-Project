from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from restaurant.models import Restaurant
from review.models import Review
from review.serializers import ReviewSerializer


class ListReview(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    search_fields = ['content']
    filter_backends = (filters.SearchFilter,)


class CreateReview(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'restaurant_id'

    def create(self, request, restaurant_id, **kwargs):
        restaurant = Restaurant.objects.get(id=restaurant_id)
        review = Review(user=request.user, restaurant=restaurant,
                        content=request.data['content'], rating=request.data['rating'])
        review.save()
        return Response(status=200)


class ListReviewByRestaurant(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'restaurant_id'

    def get_queryset(self, **kwargs):
        reviews = Review.objects.filter(
            restaurant_id=self.kwargs['restaurant_id'])
        return reviews


class ListReviewByUser(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'user_id'

    def get_queryset(self, **kwargs):
        reviews = Review.objects.filter(user_id=self.kwargs['user_id'])
        return reviews


class ListReviewByID(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'id'

    def get_queryset(self, **kwargs):
        review = Review.objects.filter(id=self.kwargs['id'])
        return review

    http_method_names = ['get', 'patch', 'delete']

    def get_permissions(self):
        if self.request and self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class ListReviewsLiked(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(fk_like_review__sender=self.request.user.id)
