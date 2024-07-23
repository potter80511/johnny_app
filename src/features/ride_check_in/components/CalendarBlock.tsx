import Flex from "src/components/Flex"
import 'react-calendar/dist/Calendar.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Dayjs } from "dayjs";

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = highlightedDays.indexOf(props.day.format('YYYY-MM-DD')) >= 0;

  return <div>
    {isSelected ? 'yes' : null}
    <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
  </div>
}

const highlightedDays = ['2024-07-21', '2024-07-19']

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
          day: ServerDay,
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
