import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from 'styled-components'

type CustomStyle = {
  color?: string
}
type EditDeleteToolsProps = {
  deleteProps: CustomStyle & { onClick: () => void }
  editProps: CustomStyle & { onClick: () => void }
}

const EditButton = styled.button<CustomStyle>`
  svg {
    color: ${({ color = 'white' }) => color};
  }
`

const EditDeleteTools = ({deleteProps, editProps}: EditDeleteToolsProps) => {
  return <div className='flex-center'>
    <EditButton type="button" color={editProps.color} onClick={editProps.onClick}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </EditButton>
    <EditButton type="button" color={deleteProps.color} onClick={deleteProps.onClick}>
      <FontAwesomeIcon icon={faTrashCan} />
    </EditButton>
  </div>
}

export default EditDeleteTools
