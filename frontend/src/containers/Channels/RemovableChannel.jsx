import { useSelector, useDispatch } from "react-redux"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Dropdown } from "react-bootstrap";
import ChannelButton from "./ChannelButton";
import { changeModalState } from "../../store/slices/app.js";

const RemovableChannel = ({ channel }) => {
    const dispatch = useDispatch();

    const { currentChannel } = useSelector((state) => state.app);

    const isModalOpened = true;
    const editChannelId = channel.id;
    const editChannelName = channel.name;

    return (
       <Dropdown as={ButtonGroup} className="d-flex">
            <ChannelButton channel={channel} />

            <Dropdown.Toggle
            variant={`${currentChannel === channel.name ? 'secondary' : ''}`}
            className="flex-grow-0 dropdown-toggle-split"
            >
                <span className="visually-hidden">{'Управление каналом'}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                href="#"
                onClick={() => dispatch(
                    changeModalState({
                      isModalOpened,
                      modalType: 'removing',
                      editChannelId,
                    }),
                  )}
                >
                    {'Удалить'}
                </Dropdown.Item>
                <Dropdown.Item
                href="#"
                onClick={() => dispatch(
                    changeModalState({
                      isModalOpened,
                      modalType: 'renaming',
                      editChannelId,
                      editChannelName,
                    }),
                  )}
                >
                    {'Переименовать'}
                </Dropdown.Item>
            </Dropdown.Menu>
       </Dropdown>
    );
};

export default RemovableChannel;