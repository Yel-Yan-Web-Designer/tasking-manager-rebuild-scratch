const taskIDDOM = document.querySelector(".single-task-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editBtnDOM = document.querySelector(".edit-btn");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".error-edit-alert");

const params = window.location.search; // get entire query string from URL
const id = new URLSearchParams(params).get("id");


const showTask = async () => {
    try {
     const {data : {task}} =   await axios.get(`/api/v2/tasks/${id}`);
        let { _id : taskID, name , completed} = task;

        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        if(completed){
            taskCompletedDOM.checked = completed;
        }
    } catch (error) {
        console.log(error);
    }
}
showTask();

editFormDOM.addEventListener("submit", async (e) => {
    editBtnDOM.textContent = "Loading..."
    e.preventDefault();

    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;

       const {data :{task}} = await axios.patch(`/api/v2/tasks/${id}`, {
        name : taskName,
        completed : taskCompleted
       });

       const { _id : taskID, name, completed} = task;
       
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Task edit successfully!";
        formAlertDOM.classList.add("success");

    } catch (error) {
        formAlertDOM.style.display = "block";
        formAlertDOM.classList.remove("success");
        formAlertDOM.textContent = "Error! please try again later!";
    }
    editBtnDOM.textContent = "Edit";
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("success");
    }, 1000);
})


