import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ReactNode, forwardRef } from 'react';
import styled from 'styled-components';


const CloseButton = styled.button`
  color: #888;
  padding: 0;
`

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  title,
  isDialogOpen,
  keepMounted = false,
  shouldHideButtons = false,
  children,
  yesText,
  noText,
  onYes,
  onNo,
  onClose
}: {
  title?: string;
  isDialogOpen: boolean;
  keepMounted?: boolean;
  shouldHideButtons?: boolean;
  children: ReactNode;
  yesText?: string
  noText?: string
  onYes?: () => void;
  onNo?: () => void;
  onClose: () => void
}) {
  const handleClose = () => {
    if(!!onNo) {
      onNo()
    } else if(!!onYes) {
      onYes()
    }
    onClose()
  };

  const handleYes = () => {
    onYes && onYes();
    handleClose();
  };

  return (
    <Dialog
      open={isDialogOpen}
      TransitionComponent={Transition}
      keepMounted={keepMounted}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <CloseButton
        type='button'
        style={{position: 'absolute', top: 20, right: 24}}
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faTimes} size='xl' />
      </CloseButton>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {children}
        </DialogContentText>
      </DialogContent>
      {!shouldHideButtons && <DialogActions>
        <Button onClick={handleClose}>{noText || 'Cancel'}</Button>
        <Button onClick={handleYes}>{yesText || 'Ok'}</Button>
      </DialogActions>}
    </Dialog>
  );
}
