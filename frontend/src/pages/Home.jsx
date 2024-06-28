/* eslint-disable no-param-reassign */

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { homeChannelsApi, useGetChannelsQuery } from '../api/homeChannelsApi.js';
import { homeMessagessApi, useGetMessagesQuery } from '../api/homeMessagesApi.js';
import { changeChannel, changeModalState } from '../store/slices/app.js';
import Channels from '../containers/Channels/Channels.jsx';
import Messages from '../containers/Messages/Messages.jsx';
import NewMessage from '../containers/Messages/NewMessage.jsx';
import getModal from '../containers/Modals/index.js';
import SocketContext from '../context/socket/SocketContext.js';
import 'react-toastify/dist/ReactToastify.css';

const renderModal = ({ isModalOpened, modalType, handleCloseModal }) => {
  if (!isModalOpened) {
    return null;
  }

  const Component = getModal(modalType);
  return <Component handleCloseModal={handleCloseModal} />;
};

const Home = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const handleCloseModal = () => {
    dispatch(changeModalState({ isModalOpened: false, modalType: null, editChannelId: null }));
  };
  useEffect(() => {
    throw new Error('Test error from Rollbar');
  }, []);

  const {
    currentChannelId,
    modals: { isModalOpened, modalType },
  } = useSelector((state) => state.app);

  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();

  useEffect(() => {
    const handleNewMessage = (newMessage) => dispatch(homeMessagessApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(newMessage);
    }));

    const handleNewChannel = (newChannel) => dispatch(homeChannelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(newChannel);
    }));

    const handleRenameChannel = (newChannel) => dispatch(homeChannelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.forEach((channel) => {
        if (channel.id === newChannel.id) {
          channel.name = newChannel.name;
          dispatch(changeChannel({ name: channel.name, id: channel.id }));
        }
      });

      return draftChannels;
    }));

    const handleRemoveChannel = ({ id }) => dispatch(homeChannelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels = draftChannels.filter((curChannels) => curChannels.id !== id);

      if (currentChannelId === id) {
        dispatch(changeChannel({ name: 'general', id: '1' }));
      }

      return draftChannels;
    }));

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('removeChannel', handleRemoveChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
    };
  }, [currentChannelId, dispatch, socket]);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels channels={channels} />
          <Messages messages={messages}>
            <NewMessage />
          </Messages>
        </div>
      </div>
      <ToastContainer />
      {renderModal({ isModalOpened, modalType, handleCloseModal })}
    </>
  );
};

export default Home;