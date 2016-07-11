export const hatModel = {
  profile: {
    name: 'profile',
    source: 'rumpel',
    fields: [
      { name: 'private' }
    ],
    subTables: [
      {
        name: 'personal',
        source: 'rumpel',
        fields: [
          { name: 'title' },
          { name: 'first_name' },
          { name: 'middle_name' },
          { name: 'last_name' },
          { name: 'preferred_name' },
          { name: 'private' }
        ]
      }, {
        name: 'nick',
        source: 'rumpel',
        fields: [
          { name: 'name' },
          { name: 'private' }
        ]
      }, {
        name: 'birth',
        source: 'rumpel',
        fields: [
          { name: 'date' },
          { name: 'private' }
        ]
      }, {
        name: 'gender',
        source: 'rumpel',
        fields: [
          { name: 'type' },
          { name: 'private' }
        ]
      }, {
        name: 'age',
        source: 'rumpel',
        fields: [
          { name: 'group' },
          { name: 'private' }
        ]
      }, {
        name: 'primary_email',
        source: 'rumpel',
        fields: [
          { name: 'value' },
          { name: 'private' }
        ]
      }, {
        name: 'alternative_email',
        source: 'rumpel',
        fields: [
          { name: 'value' },
          { name: 'private' }
        ]
      }, {
        name: 'home_phone',
        source: 'rumpel',
        fields: [
          { name: 'no' },
          { name: 'private' }
        ]
      }, {
        name: 'mobile',
        source: 'rumpel',
        fields: [
          { name: 'no' },
          { name: 'private' }
        ]
      }, {
        name: 'address_details',
        source: 'rumpel',
        fields: [
          { name: 'no' },
          { name: 'street' },
          { name: 'postcode' },
          { name: 'private' }
        ]
      }, {
        name: 'address_global',
        source: 'rumpel',
        fields: [
          { name: 'city' },
          { name: 'county' },
          { name: 'country' },
          { name: 'private' }
        ]
      }, {
        name: 'website',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'private' }
        ]
      }, {
        name: 'blog',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'private' }
        ]
      }, {
        name: 'facebook',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'private' }
        ]
      }, {
        name: 'linkedin',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'private' }
        ]
      }, {
        name: 'twitter',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'private' }
        ]
      }, {
        name: 'google',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'private' }
        ]
      }, {
        name: 'youtube',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'private' }
        ]
      }, {
        name: 'emergency_contact',
        source: 'rumpel',
        fields: [
          { name: 'first_name' },
          { name: 'last_name' },
          { name: 'mobile' },
          { name: 'relationship' },
          { name: 'private' }
        ]
      }, {
        name: 'about',
        source: 'rumpel',
        fields: [
          { name: 'title' },
          { name: 'body' },
          { name: 'private' }
        ]
      }
    ]
  }
};