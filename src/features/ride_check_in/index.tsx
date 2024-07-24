import CalendarBlock from 'src/features/ride_check_in/components/CalendarBlock'
import styled from 'styled-components'
import Sheet from 'src/features/ride_check_in/components/Sheet'

const Wrapper = styled.div`
  max-width: 403px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
`
const SeperateLine = styled.hr`
  border-color: #888;
  border-bottom: none;
`

const RideCheckInIndex = () => {
  return <Wrapper>
    <h2>共乘打卡</h2>
    <Sheet />
    <SeperateLine/>
    <CalendarBlock/>
  </Wrapper>
}

export default RideCheckInIndex
