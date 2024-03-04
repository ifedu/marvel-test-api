export interface Comic {
  dates: any;
  description: string | null;
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
}
