import { styled } from "styled-components"
import { CookiesProvider } from 'react-cookie';
import RegisterContainer from "src/features/common/Header/UserLogin/RegisterContainer"
import LoginContainer from "src/features/common/Header/UserLogin/LoginContainer"

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

const Header = () => {
  return <CookiesProvider>
    <Wrapper>
      <RegisterContainer />
      <LoginContainer />
    </Wrapper>
  </CookiesProvider>
}

export default Header
