import Flex from "src/components/Flex"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import FormattedDayDisplay from "src/features/ride_check_in/components/CalendarBlock/FormattedDayDisplay";
import AlertDialogSlide from "src/components/mui/AlertDialogSlide";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Ride } from "src/features/ride_check_in/types";
import { Dayjs } from "dayjs";
import dayjs from 'src/helpers/dayjs'
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styleComponentTheme from "src/styles/theme";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchToCheckIn } from "src/features/ride_check_in/fetchers";
import toast from "src/helpers/toastify";
import useSWR from "swr";
import baseFetcher from "src/fetcher";
import { useCookies } from "react-cookie";
import { RawRideCheckedInData } from "src/features/ride_check_in/types/net";

const highlightedDays = ['2024-07-15', '2024-07-17', '2024-07-19']

const DialogContent = styled.div`
  padding: 16px 0;
  min-width: 280px;
`

const CalendarBlock = () => {
  const [selectedRideDetail, setSelectedRideDetail] = useState<Ride | null>(null)

  const [cookies] = useCookies(['user_token'])

  const { data, isValidating: isLoading } = useSWR<APIResponse<RawRideCheckedInData[]>>('/ride/check_in', (url: string) => baseFetcher(url, {
    headers: { authorization: `Bearer ${cookies.user_token}`},
  }))

  console.log(data, 'datadatadata')

  const handleDateClick = (dayjsObj: Dayjs, isActive: boolean) => {
    setSelectedRideDetail({
      id: 1,
      date: dayjs(dayjsObj).format(),
      hasCheckedIn: isActive
    })
  }

  const handleCheckIn = (date: string) => {
    fetchToCheckIn({
      inputData: {
        checked_in_date: dayjs(date).format('YYYY-MM-DD'),
        type: 'to_work',
      },
      callBack: {
        onSuccess: ({message}) => {
          toast(message)
          selectedRideDetail && setSelectedRideDetail({
            ...selectedRideDetail,
            hasCheckedIn: true
          })
        },
        onError: ({message, type}) => toast(message, type),
      }
    })
  }

  return <Flex justifyContent="center">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        dayOfWeekFormatter={(date) => date.format('ddd')}
        shouldDisableDate={(date) => date.day() === 0 || date.day() === 6}
        views={['year', 'month', 'day']}
        slots={{
          day: (props) => <FormattedDayDisplay
            highlightedDays={data?.data?.map((item) => item.checked_in_date) || []}
            onCustomClick={handleDateClick}
            {...props}
          />,
        }}
      />
    </LocalizationProvider>
    <AlertDialogSlide
      isDialogOpen={!!selectedRideDetail}
      onClose={() => setSelectedRideDetail(null)}
      shouldHideButtons
      maxWidth="lg"
    >
      <DialogContent>
        <div>乘車日期：</div>
        <Flex justifyContent="space-between" alignItems="center">
          <div>{dayjs(selectedRideDetail?.date).locale('zh-tw').format('YYYY年 MMMDo dddd')}</div>
          {selectedRideDetail?.hasCheckedIn ? <div>
            <FontAwesomeIcon style={{marginRight: 4}} icon={faCheck} color={styleComponentTheme.palette.checkGreen} /> 已打卡
          </div> : <Button
            variant="contained"
            type="button"
            onClick={() => handleCheckIn(selectedRideDetail?.date || '')}
          >打卡</Button>}
        </Flex>
      </DialogContent>
    </AlertDialogSlide>
  </Flex>
}

export default CalendarBlock
