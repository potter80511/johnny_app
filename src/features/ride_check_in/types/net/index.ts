import { WorkType } from "src/features/ride_check_in/types"

export type NetRideCheckedInData = {
  id: number
  type: WorkType
  checked_in_date: string // YYYY-MM-DD
  created_date: string
  user_id: number
}

export type CreateRideCheckedInPayload = Pick<
  NetRideCheckedInData,
  'type' | 'checked_in_date'
>
