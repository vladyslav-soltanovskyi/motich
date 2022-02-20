import NoteItem from "./NoteItem.js";

export default function Notes(notes = []) {
  return `<h3 class="title">Все заметки</h3>
    <div class="block">
    ${!notes.length ? "У вас еще нет заметок" : notes.reduce((content, note) => content + NoteItem(note), '')}
    </div>`;
}
