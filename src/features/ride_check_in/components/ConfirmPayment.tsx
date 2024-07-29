import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import Flex from "src/components/Flex";
import AlertDialogSlide from "src/components/mui/AlertDialogSlide";
import dayjs from "src/helpers/dayjs";
import styled from "styled-components";

const Wrapper = styled(Flex)`
  margin-bottom: 36px;
`

const DialogContent = styled.div`

`
const ButtonWrapper = styled.div`
  text-align: right;
`
const CurrentMonthDisplay = styled.div`
  font-size: 22px;
  color: #888;
`

const ConfirmPayment = ({selectedCurrentDateMonth}: { selectedCurrentDateMonth: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  const [paymentDateTime, setPaymentDateTime] = useState(dayjs())
  console.log(paymentDateTime, 'paymentDateTime')

  const rideMonthDisplay = dayjs(selectedCurrentDateMonth).locale('zh-tw').format('YYYY, MMM份')

  useEffect(() => {
    if(dayjs(selectedCurrentDateMonth).month() !== dayjs().month()) {
      setPaymentDateTime(dayjs(selectedCurrentDateMonth))
    } else {
      setPaymentDateTime(dayjs())
    }
  }, [selectedCurrentDateMonth])

  return <>
    <Wrapper justifyContent="space-between" alignItems="center">
      <CurrentMonthDisplay>{rideMonthDisplay}</CurrentMonthDisplay>
      <Button
        size="small"
        variant="contained"
        type="button"
        onClick={() => setIsDialogOpen(true)}
      >確認付款</Button>
    </Wrapper>
    <AlertDialogSlide
      isDialogOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      shouldHideButtons
      maxWidth="lg"
    >
      <DialogContent>
        <div color="secondary">確認 {rideMonthDisplay} 的乘車費用之付款日期：</div>
        <DateTimePicker
          label="付款日期"
          views={['day', 'hours', 'minutes']}
          format={paymentDateTime.locale('zh-tw').format('MMM Do h:mm A')}
          value={paymentDateTime}
          slotProps={{ textField: { fullWidth: true } }}
          onChange={(newValue) => setPaymentDateTime(newValue!)}
        />
        <ButtonWrapper>
          <Button
            variant="contained"
            type="button"
            size="small"
            onClick={() => {}}
          >送出</Button>
        </ButtonWrapper>
      </DialogContent>
    </AlertDialogSlide>
  </>
}

export default ConfirmPayment
