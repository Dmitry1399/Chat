import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import { changeChannel } from '../../store/slices/app.js';
import { useRemoveChannelMutation, useGetChannelsQuery } from '../../api/homeChannelsApi.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const RemoveChannel = ({ handleCloseModal }) => {
  const { currentChannelId, editChannelId } = useSelector((state) => state.app);
  const { t } = useTranslation();

  const [removeChannel] = useRemoveChannelMutation();
  const { status } = useGetChannelsQuery();
  const dispatch = useDispatch();

  const handleRemoveChannel = async () => {
    await removeChannel({ id: editChannelId });

    if (currentChannelId === editChannelId) {
      dispatch(changeChannel({ name: 'general', id: '1' }));
    }

    toast.success(t('homePage.notifications.success.removeChannel'), {
      position: 'top-right',
      autoClose: 2000,
    });

    handleCloseModal();
  };

  return (
    <Modal show centered onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('homePage.modals.deleteChannelHeader')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('homePage.modals.deleteChannelBody')}</p>
        <FormGroup className="d-flex justify-content-end">
          <Button variant="secondary" type="button" className="me-2" onClick={handleCloseModal}>
            {t('homePage.modals.declineButton')}
          </Button>
          <Button variant="danger" type="submit" onClick={handleRemoveChannel} disabled={status === 'pending'}>
            {t('homePage.modals.deleteButton')}
          </Button>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;