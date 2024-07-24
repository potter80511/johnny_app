import Flex from "src/components/Flex"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import FormattedDayDisplay from "src/features/ride_check_in/components/CalendarBlock/FormattedDayDisplay";

const highlightedDays = ['2024-07-15', '2024-07-17', '2024-07-19']

const CalendarBlock = () => {
  const isLoading = false
  return <Flex justifyContent="center">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        // defaultValue={initialValue}
        loading={isLoading}
        // onMonthChange={handleMonthChange}
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
  </Flex>
}

export default CalendarBlock
