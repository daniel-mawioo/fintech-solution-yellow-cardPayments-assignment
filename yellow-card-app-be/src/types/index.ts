export interface Channel {
  id: string;
  max: number;
  currency: string;
  countryCurrency: string;
  status: string;
  feeLocal: number;
  createdAt: string;
  vendorId: string;
  country: string;
  feeUSD: number;
  min: number;
  channelType: string;
  rampType: string;
  updatedAt: string;
  apiStatus: string;
  settlementType: string;
  estimatedSettlementTime: number;
  balancer: Record<string, unknown>;
}

export interface Network {
  id: string;
  status: string;
  channelIds: string[];
  accountNumberType: string;
  country: string;
  code: string;
}

export interface Rate {
  code: string;
  buy: number;
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
  verified: boolean;
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
