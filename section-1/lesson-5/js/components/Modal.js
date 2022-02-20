import { hide } from "../utils/animation.js";
import Validator from "../utils/Validator.js";

export default function modal(props = {}) {
  const {
    onSubmit = () => {},
    note = {
      title: "",
      status: "",
      date: "",
      text: "",
    },
    btnSubmitText = "Создать",
  } = props;
  const $overlay = document.createElement("div");
  $overlay.classList.add("overlay");
  $overlay.innerHTML = `<div class="modal">
            <div class="modal-header">
                <h3 class="title">Создать заметку</h3>
            </div>
            <div class="modal-main">
                <div class="modal-content">
                    <form id="form-note">
                        <div class="form-group">
                            <label for="title">Заголовок</label>
                            <input type="text" id="title" name="title" value="${note.title}" placeholder="ВВЕДИТЕ ЗАМЕТКУ">
                        </div>
                        <div class="form-group">
                            <label for="status">Выберите цвет заметки</label>
                            <input type="text" id="status" name="status" value="${note.status}" placeholder="ВВЕДИТЕ ЦВЕТ">
                        </div>
                        <div class="form-group">
                            <label for="date">Выберите дату заметки</label>
                            <input type="date" id="date" name="date" value="${note.date}" placeholder="ВВЕДИТЕ ДАТУ">
                        </div>
                        <div class="form-group">
                            <label for="text">Описание</label>
                            <input type="text" id="text" name="text" value="${note.text}" placeholder="ВВЕДИТЕ ОПИСАНИЕ">
                        </div>
                    </form>
                </div>
                <div class="modal-btn-actions">
                    <button class="btn cancle">Отмена</button>
                    <button class="btn sx orange" id="submit" type="submit" form="form-note">${btnSubmitText}</button>
                </div>
            </div>
        </div>`;
  const $modal = $overlay.querySelector(".modal");
  const $btnCancle = $overlay.querySelector(".cancle");
  const $btnSubmit = $overlay.querySelector("#submit");
  const $form = $overlay.querySelector("form");
  document.body.classList.add("hidden");

  const handleSubmit = function (e) {
    e.preventDefault();

    resetErrors();

    const data = Object.fromEntries(new FormData(e.target));
    const validator = new Validator();

    validator.make(data, {
      date: ["require"],
      title: ["require", "minLength|3"],
      status: ["require", "minLength|3"],
      text: ["require", "minLength|3"],
    });

    const errors = validator.fails();

    if (!errors.status) {
      const { messages } = errors;

      for (const error in messages) {
        if (error in $form) {
          const $input = $form[error];
          $input.classList.add("error");
          const $error = $input.nextElementSibling;
          if (!$error) {
            $input.insertAdjacentHTML(
              "afterend",
              `<div class="error-text">${messages[error]}</div>`
            );
          } else {
            $error.textContent = messages[error];
          }
        }
      }
      return;
    }

    $btnSubmit.textContent = "Загрузка...";
    $btnSubmit.classList.add('disabled');
    $btnSubmit.disabled = true;

    onSubmit(data, {
      onSuccess() {
          hideModal();
      },
      onDone() {
          $btnSubmit.textContent = btnSubmitText;
          $btnSubmit.classList.remove('disabled');
          $btnSubmit.disabled = false;
      }
    });
  };

  function resetErrors() {
    const $errors = $form.querySelectorAll(".error-text");
    const $inputsError = $form.querySelectorAll("input.error");
    if ($errors === null) {
      return;
    }
    $inputsError.forEach(($input) => $input.classList.remove("error"));
    $errors.forEach(($error) => ($error.textContent = ""));
  }

  const hideModal = () => {
    hide({
      box: $overlay,
      leave: "leave-component",
      onEnd: () => {
        document.body.classList.remove("hidden");
        $overlay.remove();
      },
    });
  };

  $btnCancle.addEventListener("click", hideModal);
  $form.addEventListener("submit", handleSubmit);
  $modal.addEventListener("click", (e) => e.stopPropagation());
  $overlay.addEventListener("click", hideModal);
  document.body.appendChild($overlay);
  return $overlay;
}
