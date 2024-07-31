import CalendarBlock from 'src/features/ride_check_in/components/CalendarBlock'
import styled from 'styled-components'
import Sheet from 'src/features/ride_check_in/components/Sheet'
import { useMemo, useState } from 'react'
import dayjs from 'src/helpers/dayjs'
import useSWR from "swr";
import baseFetcher from "src/fetcher";
import { useCookies } from "react-cookie";
import { RawRideCheckedInData, RawRideTransactionData } from "src/features/ride_check_in/types/net";
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
const feePerDay = 120

const RideCheckInIndex = () => {
  const [currentDateMonth, setCurrentDateMonth] = useState(dayjs().format('YYYY-MM'))
  
  const [cookies] = useCookies(['user_token'])
  
  const {
    data: rawCheckedInDataAPIResponse,
    isValidating: isLoading,
    mutate
  } = useSWR<APIResponse<RawRideCheckedInData[]>>(
    `/ride/check_in?month=${currentDateMonth}`,
    (url: string) => baseFetcher(url, {
      headers: { authorization: `Bearer ${cookies.user_token}`},
    }),
    { revalidateIfStale: false, revalidateOnMount: true }
  )

  const {
    data: rawRideTransactionDataAPIResponse,
    isValidating: isRideTransactionDataLoading,
    mutate: mutateRideTransactionData
  } = useSWR<APIResponse<RawRideTransactionData[]>>(
    `/ride/transaction?ride_month=${currentDateMonth}`,
    (url: string) => baseFetcher<RawRideTransactionData[]>(url, {
      headers: { authorization: `Bearer ${cookies.user_token}`},
    }),
    { revalidateIfStale: false, revalidateOnMount: true }
  )
  
  const totalFee = feePerDay * (rawCheckedInDataAPIResponse?.data?.length ?? 0)
  
  const payDateDisplay = useMemo(() => {
    const payDate = (rawRideTransactionDataAPIResponse?.data && rawRideTransactionDataAPIResponse.data[0]?.transaction_date) || ''
    
    return payDate ? dayjs(payDate).locale('zh-tw').format('YYYY年 MMMDo, A h:mm') : ''
  }, [rawRideTransactionDataAPIResponse])

  return <Wrapper>
    <h2>共乘打卡</h2>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ConfirmPayment
        selectedCurrentDateMonth={currentDateMonth} fee={totalFee}
        hasPayed={!!rawRideTransactionDataAPIResponse?.data && rawRideTransactionDataAPIResponse?.data.length > 0}
        onSubmitSuccess={(newData) => !!rawRideTransactionDataAPIResponse && mutateRideTransactionData({
          ...rawRideTransactionDataAPIResponse,
          data: [newData]
        })}
      />
      <Sheet
        totalDays={rawCheckedInDataAPIResponse?.data?.length ?? 0}
        totalFee={totalFee}
        isLoading={isLoading}
        payDate={payDateDisplay}
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
