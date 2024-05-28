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

const CreateInterviewForm = ({ onSubmit }: {
  onSubmit: (data: string) => void
}) => {
  const [companyName, setCompanyName] = useState('')
  return <Form>
    <div>
      <TextField
        variant="filled"
        label="公司名稱"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        fullWidth
      />
    </div>
    <ButtonWrapper>
      <Button variant="contained" onClick={() => onSubmit(companyName)}>送出</Button>
    </ButtonWrapper>
  </Form>
}

export default CreateInterviewForm
