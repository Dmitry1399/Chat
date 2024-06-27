import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  adding: AddChannel,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

const getModal = (modalName) => modals[modalName];

export default getModal;