/* ------------------------ Selectors ------------------------ */
const formCreate = document.getElementById("create__form");
const formEdit = document.getElementById("edit__form");

const modal = document.getElementById("modal");
const editBtns = document.querySelectorAll(".edit");
const deleteBtns = document.querySelector(".del");
const updatingBtn = document.getElementById("updating__btn");
const overlay = document.getElementById("overlay");
const table = document.getElementById("table");
const tasks = document.querySelectorAll(".tasks");
const avatars = document.querySelectorAll(".avatar");
const error = document.querySelector(".error");
// Selectors add input and add button
const addInput = document.getElementById("add__input");
const updateInput = document.querySelector(".update__input");
const addBtn = document.getElementById("add__btn");
let date = document.getElementById("date");
setInterval(() => {
  date.innerHTML = nowDate();
}, 1000);
/* ------------------------ Selectors ------------------------ */
/* ------------------------ Local storage ------------------------ */
let todos = JSON.parse(localStorage.getItem("items"))
  ? JSON.parse(localStorage.getItem("items"))
  : [];
function setTodos() {
  localStorage.setItem("items", JSON.stringify(todos));
}

if (todos.length) showTodos();

/* ------------------------ Local storage ------------------------ */
let editItemIndex;
/* ------------------------ Date function ------------------------ */
function nowDate() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() + 1 < 10 ? "0" + now.getMonth() + 1 : now.getMonth() + 1;
  const years = now.getFullYear();

  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  return `${hours}:${minute}:${seconds}, ${date}.${month}.${years}`;
}
setInterval(nowDate, 1000);
/* ------------------------ Date function ------------------------ */

// error message function
function errorMessage(where, message) {
  document.querySelector(where).classList.remove("hidden");
  document.querySelector(where).textContent = message;
  const audio = new Audio("../audio/MA_Originals_GlitchyRobotics_V3.wav");
  document.getElementById("error__effect").play();
  audio.play();
  setTimeout(() => {
    document.querySelector(where).textContent = "";
  }, 2500);
}

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("items"));
  table.innerHTML = "";
  todos.forEach((item, index) => {
    table.innerHTML += `
        <tr class="tasks ${item.animation == true ? "animation__delete" : ""} ${
      item.completed == true ? "ready" : ""
    }">
            <td class="task__left">
            <img
                onclick="setCompleted(${index})"
                class="avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Arbcom_ru_ready.svg/1200px-Arbcom_ru_ready.svg.png"
                alt="avatar" />
            <h3 class="task__name">${item.text}</h3>
            <!-- <input class="task__name-input" readonly type="text" value="${
              item.text
            }"> -->
            </td>
            <td>
            <p class="time">${item.time}</p>
            </td>
            <td class="task__right">
            <img
                class="task__icon edit"
                src="https://icon-library.com/images/writing-icon-png/writing-icon-png-15.jpg"
                onclick=(editTodo(${index}))
                alt="" />
            <img
                class="task__icon del"
                src="https://cdn-icons-png.flaticon.com/512/4021/4021663.png"
                onclick="deleteTodo(${index}); animDel(${index})"
                alt="" />
            </td>
        </tr>
          `;
  });
}

// add button click
function adding() {
  if (addInput.value.trim() == "") {
    // error.classList.remove('hidden')
    errorMessage(".error", "Error message...");
  } else {
    todos.push({
      text: addInput.value.trim(),
      time: nowDate(),
      completed: false,
      animation: false,
    });
    setTodos();
    showTodos();
    addInput.value = "";
  }
}
formCreate.addEventListener("submit", () => {
  adding();
});

function updating() {
  if (updateInput.value.trim() == "") {
    errorMessage(".edit__error", "Editing error...");
  } else {
    todos.splice(editItemIndex, 1, {
      text: updateInput.value.trim(),
      time: nowDate(),
      completed: false,
    });
    setTodos();
    showTodos();
    updateInput.value = "";
    close();
  }
}

formEdit.addEventListener("submit", () => {
  updating();
});
overlay.addEventListener("click", () => {
  close();
});

// delete Todo
function deleteTodo(index) {
  // index.classList.add("animation__delete");
  setTimeout((e) => {
    const deletedTodos = todos.filter((item, i) => {
      return i !== index;
    });
    todos = deletedTodos;
    setTodos();
    showTodos();
  }, 900);
}

// setCompleted function
function setCompleted(index) {
  const completedTodos = todos.map((item, i) => {
    if (index == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });

  todos = completedTodos;
  setTodos();
  showTodos();
}

// edit Todo Function
function editTodo(index) {
  editItemIndex = index;
  open();
}

// modal function
function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

// keyBoard Event
document.addEventListener('keydown', (e) => {
    if(e.which == 27){
        close()
    }
})



// ***********************
// setCompleted function
function animDel(index) {
  const delAudio = new Audio('../audio/little-whoosh-2-6301.mp3')
  delAudio.play();
    const animTodos = todos.map((item, i) => {
      if (index == i) {
        return { ...item, animation: item.animation == true ? false : true };
      } else {
        return { ...item };
      }
    });
  
    todos = animTodos;
    setTodos();
    showTodos();
  }