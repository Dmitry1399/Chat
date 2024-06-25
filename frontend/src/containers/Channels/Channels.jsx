import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setChannels } from "../../store/slices/app.js";
import RemovableChannel from "./RemovableChannel.jsx";
import NonRemovableChannel from "../../сomponents/NonRemovableChannel.jsx";


const Channels = ({ channels }) => {
    
    const dispatch = useDispatch();

    const getChannelNames = (fethchChannels) => fethchChannels?.map(({name}) => name) ?? [];

    useEffect(() => {
        if(channels) {
            const cNames = getChannelNames(channels);
            dispatch(setChannels(cNames));
        }
    }, [channels, dispatch]);

    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <img src={'http://www.w3.org/2000/svg'} alt={'Создать новый канал'} width="20" height="20" />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => (channel.removable
          ? <RemovableChannel channel={channel} key={channel.id} />
          : <NonRemovableChannel channel={channel} key={channel.id} />))}
      </ul>
    </div>
    );
};

export default Channels;