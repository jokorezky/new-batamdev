export type Program = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  partner: string;
  link: string;
  image: string;
};

export type ProgramsResponse = {
  getProgramPublics: {
    data: Program[];
    total: number;
  };
};
