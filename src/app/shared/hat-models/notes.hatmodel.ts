export const NotesHatModel = {
  name: "notes",
  source: "rumpel",
  fields: [
    { name: "message" },
    { name: "created_time" },
    { name: "updated_time" },
    { name: "private" }
  ],
  subTables: [
    {
      name: "location",
      source: "rumpel",
      fields: [
        { name: "latitude" },
        { name: "longitude" },
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