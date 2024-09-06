from rest_framework import generics
from .models import Quotes
from .serializers import QuoteSerializer


class RandomQuoteView(generics.ListAPIView):
    queryset = Quotes.objects.order_by('?')[:1]
    serializer_class = QuoteSerializer
