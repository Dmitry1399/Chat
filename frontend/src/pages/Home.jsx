// import { useDispatch } from "react-redux";
import { useGetMessagesQuery } from "../Api/homeMessagesApi.js";
import { useGetChannelsQuery } from "../Api/homeChannelsApi.js";
// import { useEffect } from "react";
import Channels from '../containers/Channels/Channels.jsx';
import Messages from "../containers/Messages/Messages.jsx";
import NewMessage from "../containers/Messages/NewMessage.jsx";


const Home = () => {
    
    // const dispatch = useDispatch();


    const { data: messages } = useGetMessagesQuery();
    const { data: channels } = useGetChannelsQuery();

    
    
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
    )
};

export default Home;