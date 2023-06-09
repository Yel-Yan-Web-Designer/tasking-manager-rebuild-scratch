const inputTag = document.querySelector('.inputtag');
const error = document.querySelector('.error-alert');
const loading = document.querySelector('.loading');
const submit = document.querySelector('.submit-btn');
const tasks = document.querySelector('.tasks');
const deleteBtn = document.querySelector('.delete-btn');

//showtasks 
const showTasks = async () => {
    try {
        const { data : {task} } = await axios.get('/api/v2/tasks');
        // for no task 
        if(task.length < 1){
            return   tasks.innerHTML = `<h4 style="text-align : center;">No tasks in the list</h4>`
        }
        const allTasks = task.map(x => {
            let {_id, name , completed} = x;
            return `
                <div id="task" class=${completed ? "completed" : ""}>   
                    <h3>${name}</h3>
                    <div class="icon-group">
                        <a href="edit.html?id=${_id}">
                            <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                        </a>
                        <span class='delete-btn' data-id = '${_id}'> <i class="fa-sharp fa-solid fa-trash"></i></span>
                    </div>
                </div>
            `
        }).join(" ");
        tasks.innerHTML = allTasks;
    } catch (err) {
         tasks.innerHTML = `<h4 style="text-align : center; color : hsl(0, 100%, 55%);">There is an error please, try again later!</h4>`
    }   
}
showTasks();


// delete from client with api/v2/tasks
tasks.addEventListener("click", async (e) => {
    const selectedEl = e.target;
    const id = selectedEl.dataset.id;

    if(selectedEl.classList.contains("delete-btn")){
        try {
            await axios.delete(`/api/v2/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err)
        }
    }
})

// form
submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const name = inputTag.value;
    try {
        await axios.post("/api/v2/tasks", { name })
        showTasks();

        inputTag.value = ""; 
        error.style.display = "block";
        error.textContent = 'Added successfully!'
        error.classList.add("success")
        loading.style.display = "block";
    } catch (err) {
        error.style.display = "block";
        error.innerHTML = 'Error, Please try again later';
    }
    setTimeout(function () {
        error.style.display = "none";
        error.classList.remove("success")
        loading.style.display = "none"
    }, 1500)

})


    
