export interface Channel {
  id: string;
  name: string;
  status: string;
  rampType: string;
  country: string; // Add country field
}

export interface Destination {
  accountName: string;
  accountNumber: string;
  accountType: string;
  country: string;
  networkId: string;
  accountBank: string;
}

export interface DestinationResponse {
  accountName: string;
}
