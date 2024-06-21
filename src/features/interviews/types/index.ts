import { InterviewStatus } from 'src/features/interviews/enum'

export type Interview = {
  id: number
  userId: number
  companyName: string
  titleName: string | null
  status: InterviewStatus
  rejectReason: string | null
  monthSalary: number | null
  yearSalary: number | null
  welfare: string | null
  guaranteeMonth: number | null
  projects: string | null
  mainProduct: string | null
  interviewFlow: Array<string> | null
  currentTestLevel: number
  createdDate: string
  updatedDate: string
}

export type InterviewPayload = Partial<Omit<Interview, 'id'>>
& Pick<Interview, 'companyName' | 'userId'>

export type InterviewOptions = Partial<Omit<Interview, 'id'>>

export type TableKeyType = keyof Pick<Interview,
  | 'companyName'
  | 'titleName'
  | 'rejectReason'
  | 'status'
  | 'currentTestLevel'
  | 'interviewFlow'>
  | 'editDelete'

  export type InterviewFlowName =
    | 'Resume Review'
    | 'Coding Test'
    | 'Phone Interview'
    | 'HR Interview'
    | 'Techniques Interview'
    | 'Peers Interview'
    | 'CEO Interview'
