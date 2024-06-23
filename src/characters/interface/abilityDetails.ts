export interface AbilityDetails {
  index: string;
  full_name: string;
  desc: string;
  proficiencies: [
    {
      name: string;
      index: string;
      url: string;
    },
  ];
}
