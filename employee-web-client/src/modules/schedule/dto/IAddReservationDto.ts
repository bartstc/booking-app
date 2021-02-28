export interface IAddReservationDto {
  customerId: string;
  offers: Array<{
    employerId: string;
    offerId: string;
    dateFrom: string;
  }>;
}
