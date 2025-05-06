export interface IPeriod {
  startDate: Date;
  endDate: Date;
}

export interface ISeasons {
  name: string;
  code: string;
  periods: IPeriod[];
}
