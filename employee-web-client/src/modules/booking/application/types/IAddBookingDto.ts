export interface IAddBookingDto {
  customerId: string;
  bookedRecords: Array<IAddBookedRecordDto>;
}

export interface IAddBookedRecordDto {
  employerId: string;
  offerId: string;
  date: string;
}
