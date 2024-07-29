import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '@mui/material'
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

const Sheet = ({ totalDays = 0, totalFee = 0, isLoading }: {
  totalDays?: number;
  totalFee?: number;
  isLoading: boolean
}) => {
  const hasPayed = false

  const loadingDisplay = useMemo(() => {
    return <Wrapper flexDirection="column" gap={8}>
      <Flex justifyContent='space-between'>
        <Skeleton variant='rounded'width={220} height={22} />
        <Skeleton variant='rounded'width={70} height={22} />
      </Flex>
      <Flex justifyContent='space-between'>
        <Skeleton variant='rounded'width={220} height={22} />
        <Flex gap={4}>
          <Skeleton variant='rounded'width={40} height={22} />
          <Skeleton variant='rounded'width={60} height={22} />
        </Flex>
      </Flex>
    </Wrapper>
  }, [])

  const totalDaysDispay = useMemo(() => {
    const symbol = hasPayed
      ? <FontAwesomeIcon icon={faCheck} color={styleComponentTheme.palette.checkGreen} />
      : <FontAwesomeIcon icon={faTriangleExclamation} color={styleComponentTheme.palette.warning} />

    return <Flex gap={8} alignItems='center'>
      <span>{totalDays} 天, </span>
      <span>{symbol} {hasPayed ? '已' : '未'}付款</span>
    </Flex>
  }, [hasPayed, totalDays])

  if(isLoading) {
    return loadingDisplay
  }

  return <Wrapper flexDirection="column" gap={8}>
    <Flex justifyContent="space-between">累積共乘費用：<Fee>$NT {totalFee}</Fee></Flex>
    <Flex justifyContent="space-between">累積打卡天數：{totalDaysDispay}</Flex>
  </Wrapper>
}

export default Sheet
