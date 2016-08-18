export const NotesHatModel = {
  name: "notes",
  source: "rumpel",
  fields: [
    { name: "message" },
    { name: "created_time" },
    { name: "updated_time" },
    { name: "public_until" },
    { name: "private" }
  ],
  subTables: [
    {
      name: "location",
      source: "rumpel",
      fields: [
        { name: "latitude" },
        { name: "longitude" },
        { name: "accuracy" },
        { name: "altitude" },
        { name: "altitude_accuracy" },
        { name: "heading" },
        { name: "speed" },
        { name: "private" }
      ]
    },
    {
      name: "photo",
      source: "rumpel",
      fields: [
        { name: "link" },
        { name: "source" },
        { name: "caption" }
      ]
    }
  ]
}