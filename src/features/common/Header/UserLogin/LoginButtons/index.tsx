import Flex from "src/components/Flex"
import LoginContainer from "src/features/common/Header/UserLogin/LoginButtons/LoginContainer"
import RegisterContainer from "src/features/common/Header/UserLogin/LoginButtons/RegisterContainer"

const LoginButtons = () => {
  return <Flex gap={12}>
    <RegisterContainer />
    <LoginContainer />
  </Flex>
}

export default LoginButtons
