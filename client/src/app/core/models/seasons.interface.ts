export interface IPeriod {
  startDate: Date;
  endDate: Date;
}

export interface ISeasons {
  name: string;
  periods: IPeriod[];
}
