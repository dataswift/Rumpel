export const NotablesHatModel = {
  name: "notablesss",
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
      name: "locations",
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
      name: "photos",
      source: "rumpel",
      fields: [
        { name: "link" },
        { name: "source" },
        { name: "caption" }
      ]
    }
  ]
}