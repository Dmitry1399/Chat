import { useDispatch } from "react-redux";
import { homeMessagesApi, useGetMessagesQuery } from "../Api/homeMessagesApi.js";
import { homeChannelsApi, useGetChannelsQuery } from "../Api/homeChannelsApi.js";
import { useContext, useEffect } from "react";
import Channels from '../containers/Channels/Channels.jsx';
import Messages from "../containers/Messages/Messages.jsx";
import NewMessage from "../containers/Messages/NewMessage.jsx";
import SocketContext from "../context/socket/SocketContext.js";


const Home = () => {
    
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const { data: messages } = useGetMessagesQuery();
    const { data: channels } = useGetChannelsQuery();

    useEffect(() => {
      const handleNewMessage = (newMessage) => dispatch(homeMessagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
  
          draftMessages.push(newMessage);
  
      }));

      const handleNewChannel = (newChannel) => dispatch(homeChannelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
          draftChannels.push(newChannel);
      }));


      socket.on('newMessage', handleNewMessage);
      socket.on('newChannel', handleNewChannel);

      return () => {
        socket.off('newMessage', handleNewMessage);
        socket.off('newChannel', handleNewChannel);
      };
      
  }, [dispatch, socket]);
    
    
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
    </>
    );
};

export default Home;