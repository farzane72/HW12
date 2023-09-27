"use srtict";
let newTask = document.getElementById("newtask");
const form = document.getElementById("form");
const list = document.getElementById("todo-list");

const btnAll = document.getElementById("btn-all");
const btnDone = document.getElementById("btn-done");
const btnTodo = document.getElementById("btn-todo");

const iconTodo = document.getElementById("btn-todo");
const iconPencil = document.getElementById("btn-pencil");
const iconTrash = document.getElementById("btn-trash");

const btnDeleteDoneTasks = document.getElementById("btn-deleteDoneTasks");
const btnAllDelete = document.getElementById("btn-alldelete");

const main = document.getElementById("main-form");

let modal = document.getElementById("modal");
const container = document.getElementById("main-container");

const modalYes = document.querySelector("#modal-yes");
const modalNo = document.querySelector("#modal-no");

//---------------------------------------------------------------------------
// let alltasks = [];
// let doneTasks = [];
// let todoTasks = [];
//------------------------------------------------------------------------------------------------------------------------
let editTaskId = -1;
let textEditTask = "";

//-------------------------------------------------------------------------------------------------------------------------------------
const url = "http://localhost:3005";
//--------------function api------------------------------------------------------------------------------------------------------------
const getTodoes = async (pageNumber=1,RpG='') => {
  const res = await fetch(`${url}/todos/?_page=${pageNumber}&_limit=${RpG}`);
  console.log(RpG);
  //const res = await fetch(`${url}/todos`);
  const data = await res.json();
  console.log(data);
  localStorage.setItem("totalCount",res.headers.get("x-Total-Count"))
  return data;
};
const setTodoes = async (data) => {
  try {
    console.log("kkk");
    const res = await fetch(`${url}/todos`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log("Success:", result);
  } catch (error) {
    // alert(error);
  }
};
const updateTodoes = async (id) => {
  try {
    console.log(id);
    console.log(`${url}/todos/${id}`);

    const res = await fetch(`${url}/todos/${id}`);
    //,{
    //method:"PATCH",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({
    //    `${res.text} = newTask,
    //   id:id,
    //"status":false

    //
    // }),
    //}
    // )
    console.log(id);
    const result = await res.json();
    //console.log("Success Update:", result);
    console.log(result);
    return result;
  } catch (error) {
    //alert(error);
  }
};
const updateTodoes2 = async (id) => {
  console.log(id);

  try {
    const res = await fetch(`${url}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //`${res.text}`: newTask,
        text: newTask.value,
        id: id,
        status: false,
      }),
    });
    const result = await response.json();
    //newTask.value = result.text;
    console.log("Success Update:", result);
    //return(result)
  } catch (error) {
    // alert(error);
  }
};
const deleteTodoes = async (id) => {
  try {
    const res = await fetch(`${url}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const result = await response.json();
    console.log("Success:");
  } catch (error) {
    //alert(error);
  }
};
const deleteAllTodoes = async () => {
  try {
    const res = await fetch(`${url}/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(""),
    });
    // const result = await response.json();
    console.log("Success:");
  } catch (error) {
    //alert(error);
  }
};
const deleteDoneTodoes = async () => {
  try {
    console.log("kkk");
    const res = await fetch(`${url}/todos?status=true`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    // alert(error);
  }
};
const filterDoneTodoes = async () => {
  try {
    console.log("to do");
    console.log(`${url}/todos?status=true`);
    const res = await fetch(`${url}/todos?status=true`);
    const result = await res.json();
    console.log(res);
    console.log("Success:", result);
    return result;
  } catch (error) {
    // alert(error);
  }
};
const filterTodoTodoes = async () => {
  console.log(`${url}/todos?status=false`);
  try {
    const res = await fetch(`${url}/todos?status=false`);
    const result = await res.json();
    console.log("Success:", result);
    console.log(result);
    return result;
  } catch (error) {
    // alert(error);
  }
};
const updateTikTodoes = async (id, statusTask) => {
  try {
    console.log(id);
    console.log(`${url}/todos/${id}`);

    const res = await fetch(`${url}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !statusTask,
      }),
    });
    console.log(id);
    const result = await res.json();
    //console.log("Success Update:", result);
    console.log(result);
    return result;
  } catch (error) {
    //alert(error);
  }
};

//---------------------------------------------------------------------------------------------------------------------------------
getTodoes().then((data) => showTasks(data));

//------------------------------------------------------------------------------------------
form.addEventListener("submit", addTask);

btnAll.addEventListener("click", (e) => {
  getTodoes().then((data) => {
    showTasks(data);
  });
});

btnDone.addEventListener("click", (e) => {
  console.log(filterDoneTodoes());

  filterDoneTodoes().then((data) => {
    if (data.length === 0) {
      list.innerHTML = "";
      let li = document.createElement("li");
      li.className = "box-list";
      li.innerHTML = `<div class="list"> You haven't done anything yet</div>`;
      list.appendChild(li);
    } else {
      showTasks(data);
    }
  });
});
btnTodo.addEventListener("click", (e) => {
  filterTodoTodoes().then((data) => {
    if (data.length === 0) {
      list.innerHTML = "";
      let li = document.createElement("li");
      li.className = "box-list";

      li.innerHTML = `<div class="list"> You have done all the activities</div>`;
      list.appendChild(li);
    } else {
      showTasks(data);
    }
  });
});
btnDeleteDoneTasks.addEventListener("click", (e) => {
  container.classList.add("blur");
  modal.style.display = "block";
  modalYes.addEventListener("click", () => {});
  modalNo.addEventListener("click", () => {
    container.classList.remove("blur");
    modal.style.display = "none";
  });
});

btnAllDelete.addEventListener("click", (e) => {
  container.classList.add("blur");
  modal.style.display = "block";
  modalYes.addEventListener("click", deleteModalBtnAll);
  modalNo.addEventListener("click", deleteWithModalNo);
});

//----------------------------------------------------------------------------
function addTask(e) {
  e.preventDefault();

  let taskText = newTask.value.trim();

  if (taskText === "") {
    alert("Your task is empty");
  } else {
    if (editTaskId >= 0) {
      console.log(textEditTask);
      updateTodoes2(editTaskId);
      editTaskId = -1;
    } else {
      let task = {
        text: taskText,
        id: Date.now(),
        //status: "pending",
        status: false,
      };

      //---------------------------add json----------------------------

      setTodoes(task);
    }

    //write with get todoes
    getTodoes().then((data) => showTasks(data));

    newTask.value = "";
  }
}

function showTasks(array) {
  list.innerHTML = "";

  main.style.display = "block";
  array.forEach((t) => {
    let li = document.createElement("li");
    li.className = "box-list";

    li.innerHTML += `<div class="list">${t.text}</div> 
                          <div class="box-icons">`;
    //if (t.status === "done") {
    if (t.status === true) {
      li.innerHTML += `<svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="w-5 h-5 icon tik-color"
                              onclick="tikTask(${t.id},${t.status})"
                              >
                              <path
                                fill-rule="evenodd"
                                d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zm10.857 5.691a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clip-rule="evenodd"
                              />
                          </svg>`;
    } else {
      li.innerHTML += `<svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                              stroke="currentColor" 
                              class="w-6 h-6 icon tik-color"
                              onclick="tikTask(${t.id},${t.status})"
                              >
                              <path stroke-linecap="round" 
                              stroke-linejoin="round" 
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
                            />
                          </svg>`;
    }
    li.innerHTML += ` <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-5 h-5 icon pencil-color"
                                id="icon-pencil"
                                onclick="editTask(${t.id},${t.text})"
                              >
                              <path
                              d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
                              />
                          </svg>
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="w-5 h-5 icon trash-color"
                              id="icon-trash"
                              onclick="modalDeleteTask(${t.id})"
                          >
                              <path
                              fill-rule="evenodd"
                              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                              clip-rule="evenodd"
                              />
                          </svg>
                      </div>`;
    // if (t.status === "done") {
    if (t.status === true) {
      li.classList.add("done-text");
    }
    list.appendChild(li);
  });
}

function tikTask(id) {
  updateTikTodoes(id, statusTask);

  getTodoes().then((data) => showTasks(data));
}
function modalDeleteTask(id) {
  container.classList.add("blur");
  modal.style.display = "block";
  modalYes.removeEventListener("click", deleteModalBtnAll);
  modalYes.addEventListener("click", () => deleteWithModalYes(id));
  modalNo.addEventListener("click", deleteWithModalNo);
}

function editTask(id, text) {
  console.log(text);

  newTask.value = text;
  editTaskId = id;

  //updateTodoes(id)
  //.then((result)=>{
  // console.log(result)
  // let editTask=result
  //console.log(editTask)
  //newTask.value = editTask.text;
  //  textEditTask=editTask.text
  //   editTaskId = id;
  //   console.log( textEditTask);
  // })

  //updateTodoes(id,newTask.value)
  // .then(()=>{

  // })

  //let editTask = alltasks.find((t) => t.id === id);
  //let editTaske = alltasks.find((t) => t.id === id);

  //newTask.value = editTask.text;
  //editTaskId = id;

  //localStorage.setItem("ToDoList", JSON.stringify(alltasks));
  //-----------add new to done list & done--------------------------------------------
  //setItemDone(alltasks);
  //setItemTodo(alltasks);

  //showTasks(alltasks);
}

function deleteWithModalYes(id) {
  deleteTodoes(id);
  container.classList.remove("blur");
  modal.style.display = "none";
}

function deleteWithModalNo() {
  container.classList.remove("blur");
  modal.style.display = "none";
}
function deleteModalBtnAll() {
  deleteAllTodoes();
  container.classList.remove("blur");
  modal.style.display = "none";
  console.log("alltasks in btn all delete:");
  console.log(alltasks);
  main.style.display = "none";
}
//---------------------------------------------------------------------------------------------------------------
renderPagination=async(pageNumber)=>
{
  console.log(select.value);
  let RpG=select?select.value:'All';
  //let dataset;
  console.log(RpG);
  if(RpG !== "All"){
    await getTodoes(pageNumber,RpG)
    .then((data)=>showTasks(data))
    console.log(RpG);
  }
  else{
    await getTodoes(pageNumber,RpG)
    .then((data)=>showTasks(data))
  }
  //pageNumber
}

//----------------------for section 2-------------------------------------------------------------------------------
let select=document.getElementById("select-rows")
let prev=document.getElementById("btn-prev")
let next=document.getElementById("btn-next")
let page=document.getElementById("counter-page")
select.addEventListener("change",renderPagination)
// prev.addEventListener("click",()=>{
    
// })
next.addEventListener("click",()=>{
  const totalCount=localStorage.getItem('totalCount')
   if (+page.innerHTML < Math.ceil(+totalCount/+select.value)){
    page.innerText=+page.innerText+1
   // showTasks(page.innerText)
   //getTodoes(page.innerText).then((data)=>showTasks(data))
   renderPagination(page.innerText)

   }
  
})
//--------------------------------------------------------------------------------------------------


// const getTodoes2 = async (pageNumber=1,RpG) => {
//     const res = await fetch(`${url}/todos/?_page=${pageNumber}&_limit=${RpG}`);
//     const data = await res.json();
//     return data;
//   };
