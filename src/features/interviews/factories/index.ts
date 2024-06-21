import { RawInterview, RawInterviewOptions, RawInterviewPayload } from 'src/features/interviews/types/net/RawInterview';
import { Interview, InterviewOptions, InterviewPayload } from 'src/features/interviews/types';

export const createInterviewsFromNet = (rawData: RawInterview[]): Interview[] => {
  return rawData.map(({
    id,
    company_name,
    title_name,
    status,
    reject_reason,
    month_salary,
    year_salary,
    welfare,
    guarantee_month,
    projects,
    main_product,
    interview_flow,
    current_test_level,
    created_date,
    updated_date,
    user_id
  }) => ({
    id,
    companyName: company_name,
    titleName: title_name,
    status,
    rejectReason: reject_reason,
    monthSalary: month_salary,
    yearSalary: year_salary,
    welfare,
    guaranteeMonth: guarantee_month,
    projects,
    mainProduct: main_product,
    interviewFlow: interview_flow,
    currentTestLevel: current_test_level,
    createdDate: created_date,
    updatedDate: updated_date,
    userId: user_id
  }))
}

export const createInterviewsPayloadToNet = (inputData: InterviewPayload): RawInterviewPayload => {
  const { companyName, userId, titleName, interviewFlow } = inputData
  return {
    company_name: companyName,
    user_id: userId,
    title_name: titleName,
    interview_flow: interviewFlow
  }
}

export const createInterviewsOpitonsToNet = (inputData: InterviewOptions): RawInterviewOptions => {
  const { rejectReason, status } = inputData
  return {
    reject_reason: rejectReason,
    status,
  }
}
