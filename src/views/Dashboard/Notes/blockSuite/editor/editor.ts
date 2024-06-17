import { ZipTransformer, AffineSchemas } from '@blocksuite/blocks';
import { AffineEditorContainer } from '@blocksuite/presets';
import { Doc, DocCollection, Job, Schema } from '@blocksuite/store';
import { useParams } from 'react-router';

import { configuration } from './globalDoc';

import '@blocksuite/presets/themes/affine.css';
import ApiService from '../../../../../services/ApiService';

export interface EditorContextType {
  editor: AffineEditorContainer | null;
  collection: DocCollection | null;
  updateCollection: (newCollection: DocCollection) => void;
}

export const initEditor = () => {
  const params = useParams();
  const { collection } = configuration;
  const editor = new AffineEditorContainer();
  editor.doc = configuration.doc;
  if (params.id) {
    ApiService.getNote(params.id).then((response) => {
      response.json().then((json) => {
        const note = json.data.data.note;
        const binary = atob(note);
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        const blob = new Blob([bytes], { type: 'application/zip' });
        ZipTransformer.importDocs(collection, blob).then(([newDoc, _]) => {
          editor.doc = newDoc;
          configuration.doc = editor.doc;
        });
      });
    });
  } else {
    const note =
      'UEsDBAoAAAAAAFW1yVgsAf1RBgEAAAYBAAAJAAAAaW5mby5qc29uewogICJ0eXBlIjogImluZm8iLAogICJpZCI6ICIiLAogICJwYWdlVmVyc2lvbiI6IDIsCiAgIndvcmtzcGFjZVZlcnNpb24iOiAyLAogICJwcm9wZXJ0aWVzIjogewogICAgInRhZ3MiOiB7CiAgICAgICJvcHRpb25zIjogW10KICAgIH0KICB9LAogICJwYWdlcyI6IFsKICAgIHsKICAgICAgImlkIjogInBhZ2UxIiwKICAgICAgInRpdGxlIjogIiIsCiAgICAgICJjcmVhdGVEYXRlIjogMTcxNzk3MjY4NTQ0OCwKICAgICAgInRhZ3MiOiBbXQogICAgfQogIF0KfVBLAwQKAAAAAABVtclYJTWPOgcGAAAHBgAAEwAAAHBhZ2UxLnNuYXBzaG90Lmpzb257CiAgInR5cGUiOiAicGFnZSIsCiAgIm1ldGEiOiB7CiAgICAiaWQiOiAicGFnZTEiLAogICAgInRpdGxlIjogIiIsCiAgICAiY3JlYXRlRGF0ZSI6IDE3MTc5NzI2ODU0NDgsCiAgICAidGFncyI6IFtdCiAgfSwKICAiYmxvY2tzIjogewogICAgInR5cGUiOiAiYmxvY2siLAogICAgImlkIjogInhUaHFiUEpYdmgiLAogICAgImZsYXZvdXIiOiAiYWZmaW5lOnBhZ2UiLAogICAgInZlcnNpb24iOiAyLAogICAgInByb3BzIjogewogICAgICAidGl0bGUiOiB7CiAgICAgICAgIiRibG9ja3N1aXRlOmludGVybmFsOnRleHQkIjogdHJ1ZSwKICAgICAgICAiZGVsdGEiOiBbXQogICAgICB9CiAgICB9LAogICAgImNoaWxkcmVuIjogWwogICAgICB7CiAgICAgICAgInR5cGUiOiAiYmxvY2siLAogICAgICAgICJpZCI6ICJxLVlhb2ZYZDh2IiwKICAgICAgICAiZmxhdm91ciI6ICJhZmZpbmU6c3VyZmFjZSIsCiAgICAgICAgInZlcnNpb24iOiA1LAogICAgICAgICJwcm9wcyI6IHsKICAgICAgICAgICJlbGVtZW50cyI6IHt9CiAgICAgICAgfSwKICAgICAgICAiY2hpbGRyZW4iOiBbXQogICAgICB9LAogICAgICB7CiAgICAgICAgInR5cGUiOiAiYmxvY2siLAogICAgICAgICJpZCI6ICJnUWxIMFAtUnBOIiwKICAgICAgICAiZmxhdm91ciI6ICJhZmZpbmU6bm90ZSIsCiAgICAgICAgInZlcnNpb24iOiAxLAogICAgICAgICJwcm9wcyI6IHsKICAgICAgICAgICJ4eXdoIjogIlswLDAsODAwLDk1XSIsCiAgICAgICAgICAiYmFja2dyb3VuZCI6ICItLWFmZmluZS1iYWNrZ3JvdW5kLXNlY29uZGFyeS1jb2xvciIsCiAgICAgICAgICAiaW5kZXgiOiAiYTAiLAogICAgICAgICAgImhpZGRlbiI6IGZhbHNlLAogICAgICAgICAgImRpc3BsYXlNb2RlIjogImJvdGgiLAogICAgICAgICAgImVkZ2VsZXNzIjogewogICAgICAgICAgICAic3R5bGUiOiB7CiAgICAgICAgICAgICAgImJvcmRlclJhZGl1cyI6IDgsCiAgICAgICAgICAgICAgImJvcmRlclNpemUiOiA0LAogICAgICAgICAgICAgICJib3JkZXJTdHlsZSI6ICJzb2xpZCIsCiAgICAgICAgICAgICAgInNoYWRvd1R5cGUiOiAiLS1hZmZpbmUtbm90ZS1zaGFkb3ctYm94IgogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgfSwKICAgICAgICAiY2hpbGRyZW4iOiBbCiAgICAgICAgICB7CiAgICAgICAgICAgICJ0eXBlIjogImJsb2NrIiwKICAgICAgICAgICAgImlkIjogInhacmx5TzUxc0giLAogICAgICAgICAgICAiZmxhdm91ciI6ICJhZmZpbmU6cGFyYWdyYXBoIiwKICAgICAgICAgICAgInZlcnNpb24iOiAxLAogICAgICAgICAgICAicHJvcHMiOiB7CiAgICAgICAgICAgICAgInR5cGUiOiAidGV4dCIsCiAgICAgICAgICAgICAgInRleHQiOiB7CiAgICAgICAgICAgICAgICAiJGJsb2Nrc3VpdGU6aW50ZXJuYWw6dGV4dCQiOiB0cnVlLAogICAgICAgICAgICAgICAgImRlbHRhIjogW10KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sCiAgICAgICAgICAgICJjaGlsZHJlbiI6IFtdCiAgICAgICAgICB9CiAgICAgICAgXQogICAgICB9CiAgICBdCiAgfQp9UEsDBAoAAAAAAFW1yVgAAAAAAAAAAAAAAAAHAAAAYXNzZXRzL1BLAQIUAAoAAAAAAFW1yVgsAf1RBgEAAAYBAAAJAAAAAAAAAAAAAAAAAAAAAABpbmZvLmpzb25QSwECFAAKAAAAAABVtclYJTWPOgcGAAAHBgAAEwAAAAAAAAAAAAAAAAAtAQAAcGFnZTEuc25hcHNob3QuanNvblBLAQIUAAoAAAAAAFW1yVgAAAAAAAAAAAAAAAAHAAAAAAAAAAAAEAAAAGUHAABhc3NldHMvUEsFBgAAAAADAAMArQAAAIoHAAAAAA==';
    const binary = atob(note);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const blob = new Blob([bytes], { type: 'application/zip' });
    ZipTransformer.importDocs(collection, blob).then(([newDoc, _]) => {
      editor.doc = newDoc;
      configuration.doc = editor.doc;
    });
  }
  editor.slots.docLinkClicked.on(({ docId }) => {
    const target = <Doc>collection.getDoc(docId);
    editor.doc = target;
  });
  return { editor, collection };
};
