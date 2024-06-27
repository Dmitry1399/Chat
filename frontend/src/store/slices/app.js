/* eslint no-param-reassign: "error" */

import { createSlice } from '@reduxjs/toolkit';

const defaultChannelName = 'general';

const initialState = {
  currentChannel: defaultChannelName,
  currentChannelId: '1',
  editChannelId: null,
  editChannelName: null,
  channelNames: [],
  modals: {
    isModalOpened: false,
    modalType: null,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      const { name, id } = action.payload;

      state.currentChannel = name;
      state.currentChannelId = id;
    },
    changeModalState: (state, action) => {
      const {
        isModalOpened, modalType, editChannelId, editChannelName,
      } = action.payload;

      state.modals.isModalOpened = isModalOpened;
      state.modals.modalType = modalType;

      if (editChannelId || editChannelId === null) {
        state.editChannelId = editChannelId;
      }

      if (editChannelName || editChannelName === null) {
        state.editChannelName = editChannelName;
      }
    },
    setChannels: (state, { payload: channelNames }) => {
      state.channelNames = [...channelNames];
    },
  },
});

export const { changeChannel, changeModalState, setChannels } = appSlice.actions;

export default appSlice.reducer;