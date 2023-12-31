from django_filters import rest_framework as filters

from tymsa.timer.models import Timer


class TimerFilter(filters.FilterSet):
    class Meta:
        model = Timer
        fields = {
            "end_datetime": ["date__exact"],
        }
