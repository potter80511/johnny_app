import { OptionType } from 'src/types';
import { InterviewStatus } from 'src/features/interviews/enum';

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
