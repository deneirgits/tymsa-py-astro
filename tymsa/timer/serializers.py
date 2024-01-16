from rest_framework import serializers
from tymsa.projects.serializers import ProjectSerializer

from tymsa.timer.models import Timer


class PreviousTimerSerializer(serializers.ModelSerializer):
    timesince = serializers.SerializerMethodField()
    project = ProjectSerializer()

    def get_timesince(self, obj) -> int:
        return obj.timesince

    class Meta:
        model = Timer
        fields = (
            "id",
            "project",
            "start_datetime",
            "end_datetime",
            # "duration",
            "timesince",
            "note",
        )
        read_only_fields = (
            "id",
            "project",
            "start_datetime",
            "end_datetime",
            # "duration",
            "timesince",
            "note",
        )


class TimerSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        lookup_field="id",
        view_name="timer-detail",
    )
    timesince = serializers.SerializerMethodField()
    project = ProjectSerializer()
    previous = PreviousTimerSerializer()

    def get_timesince(self, obj) -> int:
        return obj.timesince

    class Meta:
        model = Timer
        fields = "__all__"


class TimerNewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timer
        fields = "__all__"
        read_only_fields = ("note", "project", "url", "timesince")


class TimerUpdateSerializer(serializers.ModelSerializer):
    def validate_start_datetime(self, value):
        if (
            self.instance
            and self.instance.end_datetime
            and value >= self.instance.end_datetime
        ):
            raise serializers.ValidationError("End must occur after start")
        return value

    def validate_end_datetime(self, value):
        if self.instance and self.instance.start_datetime >= value:
            raise serializers.ValidationError("End must occur after start")
        return value

    class Meta:
        model = Timer
        fields = "__all__"
