import Button from "@mui/material/Button";
import { useState } from "react";
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

const ConfirmPayment = ({currentDateMonth}: { currentDateMonth: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const rideMonthDisplay = dayjs(currentDateMonth).locale('zh-tw').format('YYYY, MMM份')

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
