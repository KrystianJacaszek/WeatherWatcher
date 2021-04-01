import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../../apiService';
import { AppThunk, RootState } from '../../app/store';
import { IAlertDetails } from '../Interfaces/IAlertsDetails';

interface AlertListState {
  value?: IAlertDetails[];
}

const initialState: AlertListState = {
  value: undefined,
};

export const alertListSlice = createSlice({
  name: 'alertList',
  initialState,
  reducers: {
    setAlertList: (state, action: PayloadAction<IAlertDetails[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setAlertList } = alertListSlice.actions;

export const fetchAlertList = (cityId: number): AppThunk => async dispatch => {
    const res = await  apiService.getAlerts(cityId);
  dispatch(setAlertList(res.data as IAlertDetails[]));
};

export const selectAlertList = (state: RootState) => state.alertList.value;

export default alertListSlice.reducer;
