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
import { RawRideCheckedInData } from "src/features/ride_check_in/types/net";

const DialogContent = styled.div`
  padding: 16px 0;
  min-width: 280px;
`

const CalendarBlock = ({
  isLoading,
  highlightedDays = [],
  setCurrentDateMonth,
  onCheckedInData
}: {
  isLoading: boolean
  highlightedDays: string[]
  setCurrentDateMonth: (newValue: string) => void
  onCheckedInData: (newData: RawRideCheckedInData) => void
}) => {
  const [selectedRideDetail, setSelectedRideDetail] = useState<Ride | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDateClick = (dayjsObj: Dayjs, isActive: boolean) => {
    setIsDialogOpen(true)
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
        onSuccess: ({message, data: rawResponseData}) => {
          toast(message)
          selectedRideDetail && setSelectedRideDetail({
            ...selectedRideDetail,
            hasCheckedIn: true
          })
          onCheckedInData(rawResponseData)

          setTimeout(() => setIsDialogOpen(false), 2000)
        },
        onError: ({message, type}) => toast(message, type),
      }
    })
  }

  return <Flex justifyContent="center">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        onMonthChange={(newValue) => setCurrentDateMonth(dayjs(newValue).format('YYYY-MM'))}
        renderLoading={() => <DayCalendarSkeleton />}
        dayOfWeekFormatter={(date) => date.format('ddd')}
        shouldDisableDate={(date) => date.day() === 0 || date.day() === 6}
        views={['year', 'month', 'day']}
        slots={{
          day: (props) => <FormattedDayDisplay
            highlightedDays={highlightedDays}
            onCustomClick={handleDateClick}
            {...props}
          />,
        }}
      />
    </LocalizationProvider>
    <AlertDialogSlide
      isDialogOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
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
