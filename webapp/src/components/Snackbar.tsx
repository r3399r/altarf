import { Snackbar as MuiSnackbar } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { setSnackbarMessage } from 'src/redux/uiSlice';
import Body from './typography/Body';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { snackbarMessage } = useSelector((rootState: RootState) => rootState.ui);

  const onClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(setSnackbarMessage(null));
  };

  return (
    <MuiSnackbar
      classes={{ root: '!bottom-[100px]' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={snackbarMessage !== null}
      onClose={onClose}
      autoHideDuration={2000}
    >
      <div>
        <Body
          size="l"
          className="rounded-sm bg-background-surface-overlay-normal px-5 py-[10px] text-center text-text-secondary shadow-md"
        >
          {snackbarMessage}
        </Body>
      </div>
    </MuiSnackbar>
  );
};

export default Snackbar;
