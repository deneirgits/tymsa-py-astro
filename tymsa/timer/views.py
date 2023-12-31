from http import HTTPMethod

from django.utils import timezone
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from tymsa.timer.filters import TimerFilter

from tymsa.timer.models import Timer
from tymsa.timer.serializers import (
    TimerSerializer,
    TimerNewSerializer,
    TimerUpdateSerializer,
)


class TimerViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "id"
    serializer_class = TimerSerializer
    filterset_class = TimerFilter

    def get_queryset(self):
        return (
            Timer.objects.all()
            .order_by("-start_datetime")
            .filter(end_datetime__isnull=False)
        )

    @extend_schema(operation_id="timers_current_new")
    @action(
        detail=False,
        methods=[HTTPMethod.POST],
        serializer_class=TimerNewSerializer,
    )
    def new(self, _):
        try:
            timer: Timer | None = Timer.objects.latest()
            now = timezone.now()
            timer.end_datetime = now
            timer.duration = timer.end_datetime - timer.start_datetime
            timer.save()
        except Timer.DoesNotExist:
            # no timer has been initialized ever, so we create a new one
            pass

        new_timer = Timer.objects.create()

        serializer = self.get_serializer(new_timer)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=[HTTPMethod.GET],
        serializer_class=TimerSerializer,
    )
    def current(self, _):
        try:
            timer: Timer | None = Timer.objects.filter(
                end_datetime__isnull=True
            ).latest()
        except Timer.DoesNotExist:
            return Response({})

        serializer = self.get_serializer(timer)
        return Response(serializer.data)

    @extend_schema(
        operation_id="timers_edit",
        parameters=[
            OpenApiParameter(
                name="id",
                type=OpenApiTypes.STR,
                location=OpenApiParameter.PATH,
                description='A unique integer value identifying this timer or the literal string "current" to indicate the currently running timer.',
                required=True,
            )
        ],
    )
    @action(
        detail=True,
        methods=[HTTPMethod.PATCH],
        serializer_class=TimerUpdateSerializer,
    )
    def edit(self, request, *args, **kwargs):
        if (id := kwargs.get("id")) and id == "current":
            instance = Timer.objects.latest()
        else:
            instance = Timer.objects.get(pk=id)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}  # type: ignore

        return Response(serializer.data)
