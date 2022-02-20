import LastNote from "../components/LastNote.js";
import Notes from "../components/Notes.js";
import Modal from "../components/Modal.js";
import { watchObj } from "../utils/utils.js";
import Message from "../utils/Message.js";
import { show } from "../utils/animation.js";
import { createNote, getNotes } from "../api/notes.service.js";
import Preloader from "../components/Preloader.js";

const initialState = {
    notes: []
}

export default function Dashboard() {
    const screen = document.createElement('div');
    screen.classList.add('screen');
    screen.innerHTML = `
    <div class="container">
        <h2 class="title">Мои заметки</h2>
        <div class="section" id="block-last-note">
        </div>
        <div class="section" id="block-notes">
        </div>
        <div class="btn-container">
            <button class="btn full-width orange" id="add-note">Создать заметку</button>
        </div>
    </div>`

    const $blockNotes = screen.querySelector('#block-notes');
    const $lastNote = screen.querySelector('#block-last-note');
    const $addNote = screen.querySelector('#add-note');
    const state = watchObj(initialState, render);
    

    fetchNotes();
    
    $addNote.addEventListener('click', function() {
        const $modal = Modal({
            onSubmit: addNote
        });

        show({
            box: $modal,
            enter_active: 'enter-active-component',
            enter: 'enter-component'
        });
    })

    render();


    async function addNote(data, actions) {
        try {
            const note = await createNote(data);
            new Message({ message: "заметка добавлена" });
            state.notes.push(note);
            actions?.onSuccess();
        } catch (e) {
            new Message({ message: "Ошибка при отправке" });
        } finally {
            actions?.onDone();
        }
    }

    async function fetchNotes() {
        const preloader = Preloader();
        try {
            document.body.appendChild(preloader);
            const notes = await getNotes();
            state.notes = notes;
        } catch (e) {
            console.log(e);
            new Message({ message: "Ошибка при получении" });
        } finally {
            preloader.remove();
        }
    }

    function render() {
        renderNotes();
        renderLastNote();
    }

    function renderLastNote() {
        const { notes } = state;
        const lastNode = notes.sort((a, b) => (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime()))[0];
        $lastNote.innerHTML = LastNote(lastNode);
    }

    function renderNotes() {
        const { notes } = state;
        $blockNotes.innerHTML = Notes(notes);
    }


    return screen;
}