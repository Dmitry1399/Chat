import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeChannel } from '../../store/slices/app.js';

const ChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.app);

  return (
    <Button
      variant={`${currentChannel === channel.name ? 'secondary' : ''}`}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => dispatch(changeChannel({ name: channel.name, id: channel.id }))}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

export default ChannelButton;
