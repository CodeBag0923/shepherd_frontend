import { AffineSchemas } from '@blocksuite/blocks';
import { DocCollection, Schema } from '@blocksuite/store';

const schema = new Schema().register(AffineSchemas);
const collection = new DocCollection({ schema });
const doc = collection.createDoc({ id: 'page1' });
doc.load(() => {
  const pageBlockId = doc.addBlock('affine:page', {});
  doc.addBlock('affine:surface', {}, pageBlockId);
  const noteId = doc.addBlock('affine:note', {}, pageBlockId);
  doc.addBlock('affine:paragraph', {}, noteId);
});
export const configuration = { collection, doc };
