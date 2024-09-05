from rest_framework import generics
from .models import Quote
from .serializers import QuoteSerializer


class RandomQuoteView(generics.ListAPIView):
    queryset = Quote.objects.order_by('?')[:1]
    serializer_class = QuoteSerializer

class CreateQuoteView(generics.CreateAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer