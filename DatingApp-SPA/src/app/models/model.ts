export interface User {
  id: number;
  username: string;
  gender: string;
  age: number;
  knownAs: string;
  created: Date | string;
  lastActive: Date | string;
  city: string;
  country: string;
  photoUrl: string;
  introduction?: string;
  lookingFor?: string;
  interests?: string;
  photos?: Photo[];
}

export interface Photo {
  id: number;
  url: string;
  description: string;
  dateAdded: Date | string;
  isMain: boolean;
}
