import { Job } from '@blocksuite/store';
import BlockSuite from '../blockSuite';
import { doc, collection } from '../blockSuite/editor/globalDoc';

const NewNotes = () => {
  const handleSaveClick = async () => {
    const job = new Job({ collection });
    const json = await job.docToSnapshot(doc);
    console.log(json.meta.tags[0]);
  };

  return (
    <div>
      <button onClick={handleSaveClick}>Save</button>
      <BlockSuite />
    </div>
  );
};

export default NewNotes;
