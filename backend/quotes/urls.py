from django.urls import path
from .views import RandomQuoteView, CreateQuoteView


urlpatterns = [
    path('random/', RandomQuoteView.as_view(), name='random-quote'),
    path('create/', CreateQuoteView.as_view(), name='create-quote'),

]