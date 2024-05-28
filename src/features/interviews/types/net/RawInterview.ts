import { InterviewStatus } from 'src/features/interviews/enum'

export type RawInterview = {
  id: number
  company_name: string
  title_name: string | null
  status: InterviewStatus
  reject_reason: string | null
  month_salary: number | null
  year_salary: number | null
  welfare: string | null
  guarantee_month: number | null
  projects: string | null
  main_product: string | null
  interview_flow: Array<string> | null
  current_test_level: number | null
  created_date: string
  updated_date: string
}

export type RawInterviewPayload = Pick<RawInterview, 'company_name'>

export type RawInterviewOptions = Partial<Omit<RawInterview, 'id'>>
