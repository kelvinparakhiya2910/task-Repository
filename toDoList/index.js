

let arrOfObj = [];


function makeId() {
    const tokenLen = 16;
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tokenLen; ++i)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



document.querySelector('#push').onclick = function () {
    if (document.querySelector("#newtask input").value.length === 0) {
        alert("retry pleas add new Task");
    } else {
        let input_text = document.getElementById('input_text');
        // push Object of task inside Array
        arrOfObj.push({
            id: `${makeId()}`,
            text: `${input_text.value}`,
            is_completed: "true/false"
        });

        magic(arrOfObj);

        input_text.value = "";
    }
}




function addNewTask(task_value) {
    // fatch dive in html to js
    tasksDiv = document.querySelector('#tasks');

    // create new Element div and set class "task"
    const creatDiv = document.createElement('div');
    creatDiv.setAttribute('class', 'task');

    // create new Element span and set id "taskname"
    const creatSpan = document.createElement('span');
    creatSpan.setAttribute('id', 'taskname');

    // create new texnode and set value and push inside span tag"
    let addText = document.createTextNode(`${task_value.text}`);
    creatSpan.appendChild(addText);

    // create new button and set class "delete"
    const button_delete = document.createElement('button');
    button_delete.setAttribute('id', `delete_${task_value.id}`);
    const deleteText = document.createTextNode('delet');
    button_delete.appendChild(deleteText);

    // create new button and set class "move-up"
    const button_m_up = document.createElement('button');
    button_m_up.setAttribute('id', `mUp_${task_value.id}`);
    const mUpText = document.createTextNode('Move-UP');
    button_m_up.appendChild(mUpText);

    // create new button and set class "move-down"
    const button_m_down = document.createElement('button');
    button_m_down.setAttribute('id', `mDown_${task_value.id}`);
    const mDownText = document.createTextNode('Move-Down');
    button_m_down.appendChild(mDownText);

    // create new button and set class "move-top"
    const button_m_top = document.createElement('button');
    button_m_top.setAttribute('id', `mTop_${task_value.id}`);
    const mTopText = document.createTextNode('Move-Top');
    button_m_top.appendChild(mTopText);

    // create new button and set class "move-bottom"
    const butten_m_bottom = document.createElement('button');
    butten_m_bottom.setAttribute('id', `mBottom_${task_value.id}`);
    const mBottomText = document.createTextNode('Move-Bottom');
    butten_m_bottom.appendChild(mBottomText);

    // span and button push inside the div and div push inside the html div
    creatDiv.appendChild(creatSpan);
    creatDiv.appendChild(button_delete);
    creatDiv.appendChild(button_m_up);
    creatDiv.appendChild(button_m_down);
    creatDiv.appendChild(button_m_top);
    creatDiv.appendChild(butten_m_bottom);

    tasksDiv.appendChild(creatDiv);

    // delete butten fatch and create function for delete task
    let current_tasks = document.querySelectorAll(`#delete_${task_value.id}`);
    for (let i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
            this.parentNode.remove();
            arrOfObj.splice(i, 1);
        }
    }

    document.getElementById(`mUp_${task_value.id}`).onclick = move_up(`${task_value.id}`);

    document.getElementById(`mDown_${task_value.id}`).onclick = move_down(`${task_value.id}`);

    document.getElementById(`mTop_${task_value.id}`).onclick = move_top(`${task_value.id}`);

    document.getElementById(`mBottom_${task_value.id}`).onclick = move_Bottom(`${task_value.id}`);
}

// this function delete all task and remove all array value and couent is 0 and create dive insite html
function magic(arr) {
    let remove = document.getElementById('tasks');
    remove.innerHTML = "";

    arr.forEach(element => {
        addNewTask(element);
    });

}

function move_up(id) {
    return function () {
        if (arrOfObj.length <= 1) {
            return;
        }
        let index = -1;
        for (let i = 0; i < arrOfObj.length && index === -1; i++) {
            index = arrOfObj[i].id === id ? i : index;
        }
        if (index >= 1) {
            const upTask = arrOfObj[index - 1];
            const task = arrOfObj[index];
            arrOfObj[index - 1] = task;
            arrOfObj[index] = upTask;
            magic(arrOfObj);
        }
    }
}

function move_down(id) {
    return function () {
        if (arrOfObj.length <= 1) {
            return;
        }
        let index = -1;
        for (let i = 0; i < arrOfObj.length && index === -1; i++) {
            index = arrOfObj[i].id === id ? i : index;
        }
        if (index <= arrOfObj.length - 2) {
            const lowerTask = arrOfObj[index + 1];
            const task = arrOfObj[index];
            arrOfObj[index + 1] = task;
            arrOfObj[index] = lowerTask;
            magic(arrOfObj);
        }
    };
}


function move_top(id) {
    return function () {
        if (arrOfObj.length <= 1) {
            return;
        }
        let index = -1;
        for (let i = 0; i < arrOfObj.length && index === -1; i++) {
            index = arrOfObj[i].id === id ? i : index;
        }

        if (index >= 1) {
            const topTask = arrOfObj[0];
            const task = arrOfObj[index];
            arrOfObj[0] = task;
            arrOfObj[index] = topTask;
            magic(arrOfObj);
        }

    }
}

function move_Bottom(id) {
    return function () {
        if (arrOfObj.length <= 1) {
            return;
        }
        let index = -1;
        for (let i = 0; i < arrOfObj.length && index === -1; i++) {
            index = arrOfObj[i].id === id ? i : index;
        }
        if (index <= arrOfObj.length - 2) {
            const bottomTask = arrOfObj[arrOfObj.length-1];
            const task = arrOfObj[index];
            arrOfObj[arrOfObj.length-1] = task;
            arrOfObj[index] = bottomTask;
            magic(arrOfObj);
        }
    };
}

