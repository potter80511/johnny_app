import { User } from "src/features/common/users/types";

export type RawUser = {
  id: number
  username: string
  email: string
  account: string
  password: string
  created_at: string
  updated_at: string
}

export type RegisterUserPayload = Omit<User, 'id' | 'account'>
export type LoginUserPayload = Pick<User, 'account' | 'password'>
