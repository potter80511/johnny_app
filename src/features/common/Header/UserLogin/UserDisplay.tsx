import { Button } from "@mui/material"
import { useCookies } from "react-cookie";
import Flex from "src/components/Flex"
import { User } from "src/features/common/users/types"
import useLogin from "src/features/common/users/hooks/useLogin";

const UserDisplay = ({
  userInfo,
  setUserInfo
}: {
  userInfo: User;
  setUserInfo: (emty: null) => void
}) => {
  const [_cookies, _setCookie, removeCookie] = useCookies(['user_token']);
  const { handleLogout } = useLogin()

  return <Flex alignItems="center" gap={8}>
    <span>Hi, welcome {userInfo.username || userInfo.account} !</span>
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      onClick={handleLogout}
    >Logout</Button>
  </Flex>
}

export default UserDisplay
