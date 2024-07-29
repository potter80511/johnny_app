import CalendarBlock from 'src/features/ride_check_in/components/CalendarBlock'
import styled from 'styled-components'
import Sheet from 'src/features/ride_check_in/components/Sheet'
import { useState } from 'react'
import dayjs from 'src/helpers/dayjs'
import useSWR from "swr";
import baseFetcher from "src/fetcher";
import { useCookies } from "react-cookie";
import { RawRideCheckedInData } from "src/features/ride_check_in/types/net";
import ConfirmPayment from 'src/features/ride_check_in/components/ConfirmPayment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
  }), { revalidateIfStale: false, revalidateOnMount: true })

  return <Wrapper>
    <h2>共乘打卡</h2>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ConfirmPayment selectedCurrentDateMonth={currentDateMonth} />
      <Sheet
        totalDays={rawCheckedInDataAPIResponse?.data?.length}
        isLoading={isLoading}
      />
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
    </LocalizationProvider>
  </Wrapper>
}

export default RideCheckInIndex
