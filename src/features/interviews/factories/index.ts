import { RawInterview } from 'src/features/interviews/types/net/RawInterview';
import { Interview } from 'src/features/interviews/types';

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
    updated_date
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
    updatedDate: updated_date
  }))
}
