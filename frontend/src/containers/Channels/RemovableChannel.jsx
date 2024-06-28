import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ChannelButton from './ChannelButton';
import { changeModalState } from '../../store/slices/app.js';

const RemovableChannel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        <span className="visually-hidden">{t('homePage.setupChannel')}</span>
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
          {t('homePage.modals.deleteDropMenu')}
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
          {t('homePage.modals.renameDropMenu')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableChannel;
