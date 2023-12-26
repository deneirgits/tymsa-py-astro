from rest_framework import serializers

from tymsa.projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        lookup_field="id",
        view_name="project-detail",
    )

    class Meta:
        model = Project
        fields = "__all__"
