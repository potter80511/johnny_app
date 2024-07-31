import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import Flex from "src/components/Flex";
import AlertDialogSlide from "src/components/mui/AlertDialogSlide";
import dayjs from "src/helpers/dayjs";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { fetchToCreateTransaction } from "src/features/ride_check_in/fetchers";
import toast from "src/helpers/toastify";
import { RawRideTransactionData } from "src/features/ride_check_in/types/net";

const Wrapper = styled(Flex)`
  margin-bottom: 36px;
`

const DialogContent = styled.div`
  padding: 20px 0;
  min-width: 300px;
`
const ConfirmText = styled.div`
  margin-bottom: 24px;
`
const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 24px;
`
const CurrentMonthDisplay = styled.div`
  font-size: 22px;
  color: #888;
`

const ConfirmPayment = ({
  selectedCurrentDateMonth,
  fee,
  hasPayed,
  onSubmitSuccess
}: {
  selectedCurrentDateMonth: string;
  fee: number;
  hasPayed: boolean;
  onSubmitSuccess: (data: RawRideTransactionData) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [paymentDateTime, setPaymentDateTime] = useState(dayjs())

  const rideMonthDisplay = dayjs(selectedCurrentDateMonth).locale('zh-tw').format('YYYY, MMM份')

  const handleSubmit = () => {
    fetchToCreateTransaction({
      inputData: {
        transaction_date: paymentDateTime.format(),
        fee,
        ride_month: selectedCurrentDateMonth
      },
      callBack: {
        onSuccess: ({message, data}) => {
          toast(message)
          setIsDialogOpen(false)
          onSubmitSuccess(data)
        },
        onError: ({message, type}) => {
          toast(message, type)
        },
      }
    })
  }

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
      {!hasPayed && <Button
        size="small"
        variant="contained"
        type="button"
        onClick={() => setIsDialogOpen(true)}
      >確認付款</Button>}
    </Wrapper>
    <AlertDialogSlide
      isDialogOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      shouldHideButtons
      maxWidth="lg"
    >
      <DialogContent>
        <ConfirmText>確認 <Typography component="span" color="secondary">{rideMonthDisplay}</Typography> 的乘車費用：</ConfirmText>
        <DateTimePicker
          label="付款日期"
          views={['day', 'hours', 'minutes']}
          format={paymentDateTime.locale('zh-tw').format('MMM Do A h:mm')}
          value={paymentDateTime}
          slotProps={{ textField: { fullWidth: true } }}
          onChange={(newValue) => setPaymentDateTime(newValue!)}
        />
        <ButtonWrapper>
          <Button
            variant="contained"
            type="button"
            size="small"
            onClick={handleSubmit}
          >送出</Button>
        </ButtonWrapper>
      </DialogContent>
    </AlertDialogSlide>
  </>
}

export default ConfirmPayment
