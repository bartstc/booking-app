export interface IMembersBooking {
  offer: {
    id: string;
    name: string;
  };
  facility: {
    id: string;
    address: string;
    name: string;
  };
  employee: {
    id: string;
    name: string;
  };
  date: string;
  duration: number;
  status: string; // todo: enum
  caution: string;
  bookedRecordId: string;
}
