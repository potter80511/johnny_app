import { Button } from "@mui/material"
import { useCookies } from "react-cookie";
import Flex from "src/components/Flex"
import { User } from "src/features/common/users/types"

const UserDisplay = ({
  userInfo,
  setUserInfo
}: {
  userInfo: User;
  setUserInfo: (emty: null) => void
}) => {
  const [_cookies, _setCookie, removeCookie] = useCookies(['user_token']);

  const handleLogout = () => {
    removeCookie('user_token')
    setUserInfo(null)
  }

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
