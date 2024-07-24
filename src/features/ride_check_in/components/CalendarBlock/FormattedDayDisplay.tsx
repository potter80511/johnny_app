import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from "dayjs";
import styled from 'styled-components';

const Wrapper = styled.div<{isActive: boolean}>`
  button {
    color: ${({theme:{ palette }, isActive}) => isActive && palette.checkGreen};
  }
`
function FormattedDayDisplay(props: PickersDayProps<Dayjs> & {
  highlightedDays: string[];
  onCustomClick: (dayjsObj: Dayjs, isActive: boolean) => void
}) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    onCustomClick,
    ...other
  } = props;

  const isActive = highlightedDays.indexOf(props.day.format('YYYY-MM-DD')) >= 0;

  return <Wrapper isActive={isActive}>
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      onDaySelect={(selectedDay) => onCustomClick(selectedDay, isActive)}
    />
  </Wrapper>
}

export default FormattedDayDisplay
