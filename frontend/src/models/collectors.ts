export interface ICollectorInformation {
  poapId: number;
  eventId?: number;
  user: {
    email?: string;
    walletAddress?: string;
    namedAddress?: string;
  };
  timestamp: number;
  blockNumber?: number;
  power?: number;
}

export const COLLECTORS: ICollectorInformation[] = [
  {
    poapId: 1,
    eventId: 1,
    user: {
      email: "userinfo1@mailinator.com",
      walletAddress: "0x1234567890abcdef",
      namedAddress: "Alice",
    },
    timestamp: 109276372,
    blockNumber: 123,
    power: 1,
  },
  {
    poapId: 2,
    eventId: 2,
    user: {
      walletAddress: "0x1234567890abcdef",
      namedAddress: "Alice",
    },
    timestamp: 109276372,
    blockNumber: 213,
  },
  {
    poapId: 3,
    eventId: 3,
    user: {
      walletAddress: "0x1234567890abcdef",
    },
    timestamp: 109276372,
    blockNumber: 321,
  },
];
