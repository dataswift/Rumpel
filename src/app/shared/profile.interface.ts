export interface Profile {
  private: boolean;
  personal: {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    private: boolean;
  };
  nick: {
    name: string;
    private: boolean;
  };
  body: {
    dateOfBirth: string;
    gender: string;
    age: string;
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
  email: {
    email: string;
    email2: string;
    private: boolean;
  };
  homePhone: {
    no: string;
    private: boolean;
  };
  mobile: {
    no: string;
    private: boolean;
  };
  addressDetails: {
    no: string;
    street: string;
    postcode: string;
    private: boolean;
  };
  addressGlobal: {
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
  emergencyContact: {
    firstName: string;
    lastName: string;
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