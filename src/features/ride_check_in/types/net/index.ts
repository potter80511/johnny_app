import { WorkType } from "src/features/ride_check_in/types"

export type RawRideCheckedInData = {
  id: number
  type: WorkType
  checked_in_date: string // YYYY-MM-DD
  created_date: string
  user_id: number
}
export type RawRideTransactionData = {
  id: number;
  fee: number;
  ride_month: string;
  created_date: string;
  transaction_date: string;
  user_id: number;
}

export type CreateRideCheckedInPayload = Pick<
  RawRideCheckedInData,
  'type' | 'checked_in_date'
>

export type CreateRideTransactionPayload = Pick<
RawRideTransactionData,
  'fee' | 'ride_month' | 'transaction_date'
>

export type GetRideCheckedInDataPayload = { month?: string }
export type GetRideTransactionDataPayload = { ride_month?: string }
