import { useEffect } from "react"
import { CommonWrap } from "src/styles/Styled"

const PringPringCatsIndex = () => {
  const fetchPringPringCats = async () => {
    try {
      const response = await fetch('https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDrvBbitoDXcIHklICoeE6w_guJrwotF0k&id=UCrfpfIhOA_bH9QJvZNluv9w&part=snippet,contentDetails,statistics')
      const rawData = await response.json()
      console.log(rawData)
    } catch(error) {
      console.log(error, 'fetchPringPringCatsError')
    }
  }
  useEffect(() => {
    fetchPringPringCats()
  }, [])
  return <CommonWrap>PringPringCatsIndex</CommonWrap>
}

export default PringPringCatsIndex
