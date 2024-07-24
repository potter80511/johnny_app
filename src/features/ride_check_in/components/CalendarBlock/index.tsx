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

const highlightedDays = ['2024-07-15', '2024-07-17', '2024-07-19']

const CalendarBlock = () => {
  const isLoading = false
  const [selectedRideDetail, setSelectedRideDetail] = useState<Ride | null>(null)

  const handleDateClick = (dayjsObj: Dayjs) => {
    setSelectedRideDetail({
      id: 1,
      date: dayjs(dayjsObj).format(),
      // date: dayjs(dayjsObj).locale('zh-tw').format(),
      hasCheckedIn: false
    })
  }

  return <Flex justifyContent="center">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        // defaultValue={initialValue}
        loading={isLoading}
        // onMonthChange={handleMonthChange}
        onChange={handleDateClick}
        renderLoading={() => <DayCalendarSkeleton />}
        dayOfWeekFormatter={(date) => date.format('ddd')}
        shouldDisableDate={(date) => date.day() === 0 || date.day() === 6}
        views={['year', 'month', 'day']}
        slots={{
          day: FormattedDayDisplay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
    <AlertDialogSlide
      isDialogOpen={!!selectedRideDetail}
      onClose={() => setSelectedRideDetail(null)}
      shouldHideButtons
      maxWidth="lg"
    >
      <div>
        乘車日期：
        {dayjs(selectedRideDetail?.date).locale('zh-tw').format('YYYY年 MMMDo dddd')}
      </div>
      {selectedRideDetail?.hasCheckedIn ? <div>已打卡</div> : <Button
        variant="contained"
        type="button"
        onClick={() => {}}
      >打卡</Button>}
    </AlertDialogSlide>
  </Flex>
}

export default CalendarBlock
