from django.db import models


class Quotes(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content