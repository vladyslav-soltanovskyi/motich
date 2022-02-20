import { convertTime } from "../utils/utils.js";

export default function NoteItem({ date, status, text }) {
  return `<div class="block-item">
        <div class="date">${convertTime(date)}</div>
        <div class="status" style="background: ${status}"></div>
        <div class="text">${text}</div>
    </div>`;
}
