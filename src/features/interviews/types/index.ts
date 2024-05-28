import { InterviewStatus } from 'src/features/interviews/enum'

export type Interview = {
  id: number
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
  currentTestLevel: number | null
  createdDate: string
  updatedDate: string
}

export type InterviewOptions = Partial<Omit<Interview, 'id'>>

export type TableKeyType = keyof Pick<Interview, 'companyName' | 'rejectReason' | 'status' | 'currentTestLevel' | 'interviewFlow'> | 'edit'