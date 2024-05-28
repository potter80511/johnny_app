import { Button, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"

const Form = styled.form`
  max-width: 500px;
  width: 500px;
`
const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`

const RejectReasonsForm = ({ onSubmit }: {
  onSubmit: (data: string) => void
}) => {
  const [reasons, setReasons] = useState('')
  return <Form>
    <div>
      <TextField
        component="div"
        variant="filled"
        label="Reason"
        value={reasons}
        onChange={(e) => setReasons(e.target.value)}
        rows={5}
        multiline
        fullWidth
      />
    </div>
    <ButtonWrapper>
      <Button variant="contained" onClick={() => onSubmit(reasons)}>送出</Button>
    </ButtonWrapper>
  </Form>
}

export default RejectReasonsForm
