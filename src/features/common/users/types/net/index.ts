export type RawUser = {
  id: number
  username: string
  email: string
  account: string
  password: string
  created_at: string
  updated_at: string
}

export type RegisterUserPayload = Pick<RawUser, 'username' | 'email' | 'password'>
export type LoginUserPayload = Pick<RawUser, 'account' | 'password'>
