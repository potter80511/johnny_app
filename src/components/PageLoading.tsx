import styled from "styled-components"
import Flex from "src/components/Flex"
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, .5);
`
const Text = styled.span`
  display: block;
  margin-left: 8px;
  font-size: 32px;
`

const PageLoading = () => {
  return <Wrapper justifyContent="center" alignItems="center">
    <FontAwesomeIcon icon={faPaw} bounce size="2xl"/>
    <Text>Loading...</Text>
  </Wrapper>
}

export default PageLoading
