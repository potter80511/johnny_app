import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'
import Flex from 'src/components/Flex'
import styleComponentTheme from 'src/styles/theme'
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  padding-bottom: 16px;
`
const Fee = styled.span`
  color: red;
`

const feePerDay = 120

const Sheet = ({ totalDays = 0 }: {totalDays?: number}) => {

  console.log(totalDays, 'totalDaystotalDaystotalDays')
  const total = feePerDay * totalDays

  const hasPayed = false

  const totalDaysDispay = useMemo(() => {
    const symbol = hasPayed
      ? <FontAwesomeIcon icon={faCheck} color={styleComponentTheme.palette.checkGreen} />
      : <FontAwesomeIcon icon={faTriangleExclamation} color={styleComponentTheme.palette.warning} />

    return <Flex gap={8} alignItems='center'>
      <span>{totalDays} 天, </span>
      <span>{symbol} {hasPayed ? '已' : '未'}付款</span>
    </Flex>
  }, [hasPayed, totalDays])

  return <Wrapper flexDirection="column" gap={8}>
    <Flex justifyContent="space-between">累積共乘費用：<Fee>$NT {total}</Fee></Flex>
    <Flex justifyContent="space-between">累積打卡天數：{totalDaysDispay}</Flex>
  </Wrapper>
}

export default Sheet
