/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TQuery {
  name: string;
  value: any;
}

export interface TUserData {
  id: string;
  firstName: string;
  lastName: string | null;
  sureName: string | null;
  profilePic: string | null;
  website: string | null;
  cantone: string | null;
  indirizzo: string | null;
  cap: string | null;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userStatus: "ACTIVE";
  billingDataId: string | null;
  inRisaltoDays: number;
  inHomePageDays: number;
  inCimaTimes: number;
  subscriptionType: "STANDARD" | "PLUS" | "BUSINESS";
}
