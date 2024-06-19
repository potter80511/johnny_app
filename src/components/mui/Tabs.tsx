import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ReactNode, useState } from "react"

type TabsProps = {
  data: Array<{
    content: ReactNode
    label: string
  }>
}

const Tabs = ({ data }: TabsProps) => {
  const [value, setValue] = useState('0')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return <Box sx={{ width: '100%', typography: 'body1' }}>
  <TabContext value={value}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList onChange={handleChange} aria-label="lab API tabs example">
        {data.map((tab, index) => <Tab key={`tab-${tab.label}`} label={tab.label} value={String(index)} />)}
      </TabList>
    </Box>
    {data.map((tab, index) => <TabPanel
      key={`tab-content-${tab.label}`}
      value={String(index)}
    >{tab.content}</TabPanel>)}
  </TabContext>
</Box>
}

export default Tabs
