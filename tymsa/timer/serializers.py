from rest_framework import serializers
from tymsa.projects.serializers import ProjectSerializer

from tymsa.timer.models import Timer


class TimerSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        lookup_field="id",
        view_name="timer-detail",
    )
    timesince = serializers.SerializerMethodField()
    project = ProjectSerializer()

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
    class Meta:
        model = Timer
        fields = "__all__"
