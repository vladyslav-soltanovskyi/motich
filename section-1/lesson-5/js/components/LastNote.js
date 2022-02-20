import { convertDate } from "../utils/utils.js";

export default function LastNode(props) {
  if (!props) {
    return "";
  }
  const { date, text } = props;

  return `<h3 class="title">Последняя заметка</h3>
    <div class="block">
        <div class="block-poster">
            <img src="images/Rectangle 6.png" alt="">
        </div>
        <div class="block-info">
            <h3 class="title">Важная инфо</h3>
            <p class="date">${convertDate(date)}</p>
            <p class="text">${text.length > 60 ? `${text}...` : text}</p>
        </div>
    </div>`;
}
