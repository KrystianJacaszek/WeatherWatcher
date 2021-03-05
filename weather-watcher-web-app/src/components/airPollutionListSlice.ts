import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../apiService';
import { AppThunk, RootState } from '../app/store';
import { IAirPollution } from './Interfaces/IAirPollution';

interface AirPollutionListState {
  value?: IAirPollution[];
}

const initialState: AirPollutionListState = {
  value: undefined,
};

export const airPollutionListSlice = createSlice({
  name: 'airPollutionList',
  initialState,
  reducers: {
    setAirPollutionList: (state, action: PayloadAction<IAirPollution[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setAirPollutionList } = airPollutionListSlice.actions;

export const fetchAirPollutionList = (cityId: number): AppThunk => async dispatch => {
    const res = await  apiService.getAirPollution(cityId);
  dispatch(setAirPollutionList(res.data as IAirPollution[]));
};

export const selectAirPollutionList = (state: RootState) => state.airPollutionList.value;

export default airPollutionListSlice.reducer;
