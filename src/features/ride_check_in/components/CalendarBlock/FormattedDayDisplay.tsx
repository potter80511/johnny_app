import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from "dayjs";
import styled from 'styled-components';

const Wrapper = styled.div<{isSelected: boolean}>`
  button {
    color: ${({theme:{ palette }, isSelected}) => isSelected && palette.checkGreen};
  }
`
function FormattedDayDisplay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = highlightedDays.indexOf(props.day.format('YYYY-MM-DD')) >= 0;

  return <Wrapper isSelected={isSelected}>
    <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
  </Wrapper>
}

export default FormattedDayDisplay
