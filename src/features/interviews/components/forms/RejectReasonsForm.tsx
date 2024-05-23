import { useState } from "react"

const RejectReasonsForm = ({ onSubmit }: {
  onSubmit: (data: string) => void
}) => {
  const [reasons, setReasons] = useState('')
  return <form>
    <input type="text" value={reasons} onChange={(e) => setReasons(e.target.value)} />
    <button type="button" onClick={() => onSubmit(reasons)}>送出</button>
  </form>
}

export default RejectReasonsForm
