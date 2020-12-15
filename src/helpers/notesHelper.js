import { db } from "../firebase/firebase";

export const loadNotes = async uid => {
  const notesDb = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];

  notesDb.forEach(snap => {
    notes.push({
      id: snap.id,
      ...snap.data(),
    });
  });

  return notes;
};
