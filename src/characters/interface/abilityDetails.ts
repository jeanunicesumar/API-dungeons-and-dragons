export interface AbilityDetails {
  index: string;
  full_name: string;
  desc: string;
  skills: [
    {
      name: string;
      index: string;
      url: string;
    },
  ];
}
