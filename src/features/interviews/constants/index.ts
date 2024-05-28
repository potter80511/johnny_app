import { OptionType } from 'src/types';
import { InterviewStatus } from 'src/features/interviews/enum';
import { TableHeadData } from 'src/features/interviews/components/Table';
import { TableKeyType } from 'src/features/interviews/types';

export const statusOptions: OptionType<InterviewStatus>[] = [
  {
    label: 'Pending',
    value: InterviewStatus.Pending
  },
  {
    label: 'Sent',
    value: InterviewStatus.Sent
  },
  {
    label: 'Interview',
    value: InterviewStatus.Interview
  },
  {
    label: 'Rejected',
    value: InterviewStatus.Reject
  },
  {
    label: 'Offer Got',
    value: InterviewStatus.GetOffer
  },
  {
    label: 'Approved',
    value: InterviewStatus.Approved
  },
  {
    label: 'Salary Calculating',
    value: InterviewStatus.CalculateSalary
  },
]

export const tableHeadData: TableHeadData<TableKeyType> = {
  companyName: {
    headTitle: '公司名稱'
  },
  rejectReason: {
    headTitle: '回絕原因',
  },
  interviewFlow: {
    headTitle: '流程'
  },
  currentTestLevel: {
    headTitle: '當前關卡'
  },
  status: {
    headTitle: '狀態',
    width: 100
  },
  edit: {
    headTitle: '',
    width: 30,
    align: 'center'
  }
}
