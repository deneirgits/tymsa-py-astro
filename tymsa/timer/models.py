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
    start_datetime = models.DateTimeField(blank=False, null=False, default=timezone.now)
    end_datetime = models.DateTimeField(blank=True, null=True)
    note = models.CharField(max_length=30, blank=True)
    duration = models.DurationField(blank=True, null=True, editable=False)
    previous = models.ForeignKey(
        "Timer",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    _old_start_datetime = None
    _old_end_datetime = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._old_start_datetime = self.start_datetime
        self._old_end_datetime = self.end_datetime

    @property
    def timesince(self):
        delta = self.duration
        if not delta:
            now = timezone.now()
            delta = now - self.start_datetime

        # remove microseconds
        timesince = timedelta(days=delta.days, seconds=delta.seconds)
        return timesince

    def save(self, *args, **kwargs):
        if self.end_datetime and (
            self._old_end_datetime != self.end_datetime
            or self._old_start_datetime != self.start_datetime
        ):
            self.duration = self.end_datetime - self.start_datetime

        super().save(*args, **kwargs)

    class Meta:
        get_latest_by = "start_datetime"
