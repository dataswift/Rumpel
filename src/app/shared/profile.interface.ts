export interface Profile {
  private: string;
  fb_profile_photo: {
    private: boolean
  };
  personal: {
    title: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    preferred_name: string;
    private: boolean;
  };
  nick: {
    name: string;
    private: boolean;
  };
  birth: {
    date: string;
    private: boolean;
  };
  gender: {
    type: string;
    private: boolean;
  };
  age: {
    group: string;
    private: boolean;
  };
  primary_email: {
    value: string;
    private: boolean;
  };
  alternative_email: {
    value: string;
    private: boolean;
  };
  home_phone: {
    no: string;
    private: boolean;
  };
  mobile: {
    no: string;
    private: boolean;
  };
  address_details: {
    no: string;
    street: string;
    postcode: string;
    private: boolean;
  };
  address_global: {
    city: string;
    county: string;
    country: string;
    private: boolean;
  };
  website: {
    link: string;
    private: boolean;
  };
  blog: {
    link: string;
    private: boolean;
  };
  facebook: {
    link: string;
    private: boolean;
  };
  linkedin: {
    link: string;
    private: boolean;
  };
  twitter: {
    link: string;
    private: boolean;
  };
  google: {
    link: string;
    private: boolean;
  };
  youtube: {
    link: string;
    private: boolean;
  };
  emergency_contact: {
    first_name: string;
    last_name: string;
    mobile: string;
    relationship: string;
    private: boolean;
  };
  about: {
    title: string;
    body: string;
    private: boolean;
  };
}