import re
from django.core.management.base import BaseCommand
from faker import Faker
from quotes.models import Quotes

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        fake = Faker()

        Quotes.objects.all().delete()

        def generate_quote():
            words = []
            while len(words) < 25:
                sentence = fake.sentence()
                sentence = sentence.lower()
                sentence = re.sub(r'[^a-z\s]', '', sentence)
                words.extend(sentence.split())
            return ' '.join(words[:25])

        quotes = [Quotes(content=generate_quote()) for _ in range(100)]
        Quotes.objects.bulk_create(quotes)

        self.stdout.write(self.style.SUCCESS('Success.'))
