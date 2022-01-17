import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/Components/modal.css";
import "../CSS/Assets/assets.css";
 
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  height:300,
  border: '#242024',
  borderRadius:'4px',
  padding:'16px',
  backgroundColor:'#363636',
  display:'flex',
  alignItems:'center',  
  flexDirection:'column',

};

export default function Modal(props) {
    const navigate = useNavigate()
    const quit = () => {
        navigate("/")
    }
    const again = () => {
        navigate("/bet")
    }

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={props.modalOpen}
        BackdropComponent={Backdrop}
      >
        <Box sx = {style}>
        <div className="tag">{props.message}</div>
        <div className="mt2">
          <div className="t2">Dealer Value: {props.dealer}</div>
          <div className="t2">Your Value: {props.player}</div>
        </div>
          <div>
          <button className="button--default" onClick={quit}>Quit</button>
          <button className="button--default" onClick={again}>Play Again</button>
        </div>
        </Box>
      </StyledModal>
    </div>
  );
}