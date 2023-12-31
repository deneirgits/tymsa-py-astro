from datetime import timedelta
from django.db import models
from django.utils import timezone

from tymsa.projects.models import Project


class Timer(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    start_datetime = models.DateTimeField(auto_now_add=True)
    end_datetime = models.DateTimeField(blank=True, null=True, editable=False)
    note = models.CharField(max_length=30, blank=True)
    duration = models.DurationField(blank=True, null=True, editable=False)

    @property
    def timesince(self):
        delta = self.duration
        if not delta:
            now = timezone.now()
            delta = now - self.start_datetime

        # remove microseconds
        timesince = timedelta(days=delta.days, seconds=delta.seconds)
        return timesince

    class Meta:
        get_latest_by = "start_datetime"
