// The 41 people who've spent meaningful time at Campfire — the pool you vote
// from. Source: superlatives-names-years.csv. "years" is shown as flavor on the
// nominee chips ("2021–2024", "2020–present").

export interface Nominee {
  name: string;
  years: string;
}

export const NOMINEES: Nominee[] = [
  { name: "Steve Arntz", years: "2020–present" },
  { name: "Todd Ericksen", years: "2020–2023" },
  { name: "Taylor Murphy", years: "2020–2022" },
  { name: "Marinne Pearson", years: "2020–present" },
  { name: "Kelly Bonnez", years: "2021–2023" },
  { name: "Jessi Cummings", years: "2021–2022" },
  { name: "Bruce Hansen", years: "2021–2024" },
  { name: "Heather Adams", years: "2021–2023" },
  { name: "Logan Williams", years: "2021–2024" },
  { name: "Jason Allen", years: "2021–2024" },
  { name: "Christopher Miller", years: "2021–2023" },
  { name: "Cory Anderson", years: "2021" },
  { name: "Sarah Dethloff", years: "2021–2022" },
  { name: "Mac Fackrell", years: "2021–2022" },
  { name: "Juanita Pine", years: "2021" },
  { name: "Gina Fresquez", years: "2021–present" },
  { name: "Lynsey Mella", years: "2022–2023" },
  { name: "Megan Galloway", years: "2022–2024" },
  { name: "Sigrid Rapp", years: "2022–present" },
  { name: "Stephanie Staidle", years: "2022–present" },
  { name: "Claire Keller", years: "2022" },
  { name: "Anne Staheli", years: "2022–2023" },
  { name: "Annie Brown", years: "2022" },
  { name: "Nate Skonnard", years: "2022–2024" },
  { name: "Camara Pender", years: "2022–present" },
  { name: "Sean Miller", years: "2022–2024" },
  { name: "Mackinzie Hamilton", years: "2022–2023" },
  { name: "Teia Raus", years: "2022–2024" },
  { name: "Hailey Huish", years: "2022–2023" },
  { name: "Collin Shill", years: "2022–2023" },
  { name: "Jenn Iwerks", years: "2022–present" },
  { name: "Luke Kujacznski", years: "2022–2023" },
  { name: "Carlos Feliciano-Barba", years: "2023–present" },
  { name: "Meg Atkisson", years: "2023" },
  { name: "Ella Wright", years: "2023–present" },
  { name: "Bree Smith", years: "2023–present" },
  { name: "Sara Romney", years: "2023–2024" },
  { name: "Nami Jagtiani", years: "2024–present" },
  { name: "Ben Murphy", years: "2024–2025" },
  { name: "Shannon Flake", years: "2025–present" },
  { name: "MeLissa Pernell", years: "2026–present" },
];

export const NOMINEE_NAMES = NOMINEES.map((n) => n.name);
