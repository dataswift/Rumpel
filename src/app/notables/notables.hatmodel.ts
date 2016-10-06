export const NotablesHatModel = {
  name: "notables2",
  source: "rumpel",
  fields: [
    { name: "message" },
    { name: "type" },
    { name: "created_time" },
    { name: "updated_time" },
    { name: "public_until" },
    { name: "shared" }
  ],
  subTables: [
    {
      name: "author998",
      source: "rumpel",
      fields: [
        { name: "id" },
        { name: "name" },
        { name: "nick" },
        { name: "phata" },
        { name: "photo_url" }
      ]
    },
    {
      name: "location998",
      source: "rumpel",
      fields: [
        { name: "latitude" },
        { name: "longitude" },
        { name: "accuracy" },
        { name: "altitude" },
        { name: "altitude_accuracy" },
        { name: "heading" },
        { name: "speed" },
        { name: "shared" }
      ]
    },
    {
      name: "photo998",
      source: "rumpel",
      fields: [
        { name: "link" },
        { name: "source" },
        { name: "caption" },
        { name: "shared" }
      ]
    }
  ]
}