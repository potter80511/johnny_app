import { RawUser } from "src/features/common/users/types/net";
import { User } from "src/features/common/users/types";

export const createUserFromNet = (rawData: RawUser): User => {
  return {
    id: rawData.id,
    username: rawData.username,
    email: rawData.email,
    account: rawData.account
  }
}
