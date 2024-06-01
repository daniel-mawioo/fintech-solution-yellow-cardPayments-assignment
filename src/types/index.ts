export interface Destination {
  accountNumber: string;
  accountType: string;
  country: string;
  networkId: string;
  accountBank: string;
  accountName?: string;
}

export interface Sender {
  name: string;
  country: string;
  phone: string;
  address: string;
  dob: string;
  email: string;
  idNumber: string;
  idType: string;
}

export interface DestinationResponse {
  accountName: string;
  [key: string]: any;
}
