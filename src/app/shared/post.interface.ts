interface Link {
  caption: string;
  description: string;
  link: string;
  name: string;
  picture: string;
  fullPicture: string;
}

interface Photo {
  name: string;
  message: string;
  picture: string;
  fullPicture: string;
}

interface Status {
  message: string;
}

export interface Post {
  createdTime: any;
  updatedTime: any;
  statusType: string;
  type: string;
  privacy: { value: string; description: string };
  from: string;
  application: string;
  story: string;
  content: Link | Status | Photo;
}

