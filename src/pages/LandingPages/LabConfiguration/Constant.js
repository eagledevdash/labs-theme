export const labPermissionsArr = [
  {
    listHeading: "GCP Compute Engine Permissions:",
    options: [
      {
        label: "Create new Compute Engine instances.",
        value: "compute.instances.create",
        groupBy: "GCP Compute Engine Permissions:",
      },
      {
        label: "Delete Compute Engine instances.",
        value: "compute.instances.delete",
        groupBy: "GCP Compute Engine Permissions:",
      },
      {
        label: "Start Compute Engine instances.",
        value: "compute.instances.start",
        groupBy: "GCP Compute Engine Permissions:",
      },
    ],
  },
  {
    listHeading: "GCP Storage Permissions:",
    options: [
      {
        label: "Create new storage buckets.",
        value: "storage.buckets.create",
        groupBy: "GCP Storage Permissions:",
      },
      {
        label: "List objects within a storage bucket.",
        value: "storage.objects.list",
        groupBy: "GCP Storage Permissions:",
      },
      {
        label: "Delete objects within a storage bucket.",
        value: "storage.objects.delete",
        groupBy: "GCP Storage Permissions:",
      },
    ],
  },
  //   {
  //     listHeading: "AWS",
  //     options: [
  //       {
  //         label: "Create new storage buckets.",
  //         value: "storage.buckets.create",
  //       },
  //       {
  //         label: "List objects within a storage bucket.",
  //         value: "storage.objects.list",
  //       },
  //       {
  //         label: "storage.objects.delete",
  //         value: "",
  //       },
  //     ],
  //   },
  //   {
  //     listHeading: "Azure",
  //     options: [
  //       {
  //         label: "Create new storage buckets.",
  //         value: "storage.buckets.create",
  //       },
  //       {
  //         label: "List objects within a storage bucket.",
  //         value: "storage.objects.list",
  //       },
  //       {
  //         label: "storage.objects.delete",
  //         value: "",
  //       },
  //     ],
  //   },
];

export const allOptions = [
  {
    label: "Create new Compute Engine instances.",
    value: "compute.instances.create",
    groupBy: "GCP Compute Engine Permissions:",
  },
  {
    label: "Delete Compute Engine instances.",
    value: "compute.instances.delete",
    groupBy: "GCP Compute Engine Permissions:",
  },
  {
    label: "Start Compute Engine instances.",
    value: "compute.instances.start",
    groupBy: "GCP Compute Engine Permissions:",
  },
  {
    label: "Create new storage buckets.",
    value: "storage.buckets.create",
    groupBy: "GCP Storage Permissions:",
  },
  {
    label: "List objects within a storage bucket.",
    value: "storage.objects.list",
    groupBy: "GCP Storage Permissions:",
  },
  {
    label: "Delete objects within a storage bucket.",
    value: "storage.objects.delete",
    groupBy: "GCP Storage Permissions:",
  },
];
