import { Modal as MuiModal } from '@mui/material';
import Container from '@mui/material/Container';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useMedia } from '../../use-media';
import { mobileWidth } from '../../helper';

function Modal({ open, onClose, children, maxWidth, ...props }) {
  return (
    <MuiModal {...props} open={open} onClose={onClose}>
      <Container sm maxWidth={maxWidth} className={'modal_container'}>
        <CancelRoundedIcon
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '35px',
            cursor: 'pointer',
            mt: 2,
          }}
        />
        {children}
      </Container>
    </MuiModal>
  );
}

export default Modal;
