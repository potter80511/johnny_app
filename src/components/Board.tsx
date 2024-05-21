import { ReactNode } from 'react';
import styled from 'styled-components'

type BoardProps = {
  title: string
  children: ReactNode
}

const Wrapper = styled.div`
  border-radius: 5px;
  overflow: hidden;
`;
const Head = styled.div`
  background: #282d36;
  border-bottom: 1px solid #171717;
  padding: 16px;
`;
const Body = styled.div`
  background: #2e353e;
  padding: 16px;
`;

const Board = ({ title, children }: BoardProps) => {
  return <Wrapper>
    <Head>{title}</Head>
    <Body>{children}</Body>
  </Wrapper>
}

export default Board
