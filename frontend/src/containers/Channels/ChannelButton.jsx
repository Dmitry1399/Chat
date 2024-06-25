import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ChannelButton = ({ channel }) => {

    const { currentChannel } = useSelector((state) => state.app);
    
    return (
        <Button
        variant={`${currentChannel === channel.name ? 'secondary' : ''}`}
        className="w-100 rounded-0 text-start text-truncate"
        >
            <span className="me-1">#</span>
            {channel.name}
        </Button>
    );
};

export default ChannelButton;