import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux"
import Message from "../../сomponents/Message.jsx";

const Messages = ({ messages, children }) => {

    const { currentChannel, currentChannelId } = useSelector((state) => state.app);
    
    const messagesBoxRef = useRef(null);

    const currentChannelMessages = useMemo(
        () => messages?.filter((message) => message.channelId === currentChannelId) ?? [],
        [messages, currentChannelId],
    );

    const messageCount = currentChannelMessages.length;
    
    useEffect(() => {
      if(messagesBoxRef.current) {
          messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
      }
    }, [currentChannelMessages]);

    return (
        <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel}`}</b>
          </p>
          <span className="text-muted">{`${messageCount} сообщений`}</span>
        </div>
        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages
            ?.map((message) => <Message message={message} key={message.id} />)}
        </div>
        {children}
      </div>
    </div>
    );
};

export default Messages;