import CalendarBlock from 'src/features/ride_check_in/components/CalendarBlock'
import styled from 'styled-components'
import Sheet from 'src/features/ride_check_in/components/Sheet'
import { useState } from 'react'
import dayjs from 'src/helpers/dayjs'
import useSWR from "swr";
import baseFetcher from "src/fetcher";
import { useCookies } from "react-cookie";
import { RawRideCheckedInData } from "src/features/ride_check_in/types/net";

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
  const [currentDateMonth, setCurrentDateMonth] = useState(dayjs().format('YYYY-MM'))

  const [cookies] = useCookies(['user_token'])

  const { data: rawCheckedInDataAPIResponse, isValidating: isLoading, mutate } = useSWR<APIResponse<RawRideCheckedInData[]>>(`/ride/check_in?month=${currentDateMonth}`, (url: string) => baseFetcher(url, {
    headers: { authorization: `Bearer ${cookies.user_token}`},
  }))

  console.log(rawCheckedInDataAPIResponse, 'datadatadata')

  return <Wrapper>
    <h2>共乘打卡</h2>
    <Sheet totalDays={rawCheckedInDataAPIResponse?.data?.length} />
    <SeperateLine/>
    <CalendarBlock
      isLoading={isLoading}
      highlightedDays={rawCheckedInDataAPIResponse?.data?.map((item) => item.checked_in_date) || []}
      setCurrentDateMonth={setCurrentDateMonth}
      onCheckedInData={(newData) => {
        rawCheckedInDataAPIResponse && mutate({
          ...rawCheckedInDataAPIResponse,
          data: [...rawCheckedInDataAPIResponse.data, newData]
        })
      }}
    />
  </Wrapper>
}

export default RideCheckInIndex
