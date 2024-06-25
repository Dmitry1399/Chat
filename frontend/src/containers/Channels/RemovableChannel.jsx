import { useSelector } from "react-redux"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Dropdown } from "react-bootstrap";
import ChannelButton from "./ChannelButton";

const RemovableChannel = ({ channel }) => {
    

    const { currentChannel } = useSelector((state) => state.app);

    return (
       <Dropdown as={ButtonGroup} className="d-flex">
            <ChannelButton channel={channel} />

            <Dropdown.Toggle
            variant={`${currentChannel === channel.name ? 'secondary' : ''}`}
            className="flex-grow-0 dropdown-toggle-split"
            >
                <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                href="#"
                >
                    Удалить
                </Dropdown.Item>
                <Dropdown.Item
                href="#"
                >
                    Переименовать
                </Dropdown.Item>
            </Dropdown.Menu>
       </Dropdown>
    );
};

export default RemovableChannel;