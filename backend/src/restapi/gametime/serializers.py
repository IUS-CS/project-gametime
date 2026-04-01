from rest_framework import serializers
from .models import REVIEWS


class reviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userID.username', read_only=True)
    formatedDate = serializers.DateTimeField(
        source='date',
        format='%m/%d/%Y',
        read_only=True
    )
    class Meta:
        model = REVIEWS
        fields = ['username', 'review', 'rating', 'formatedDate']
