export interface ComicAPI {
  dates: [{ date: string }];
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
}

export interface Comic {
  id: number;
  img: string;
  title: string;
  year: string;
}
