console.log('js');
$(document).ready(init);

function init() {
    console.log('JQ');
    getList();
    $('#js-btn-save').on('click', saveTodo);
    $('#js-list').on('click', '#js-btn-delete', deleteTodo);
    $('#js-list').on('click', '#js-btn-done', done);
    $('#js-list').on('click', '#js-btn-notdone', notDone);
};

function saveTodo(event) {
    const newTodo = {
        description: $('#js-desc').val(),
        status: 'not done',
        date: $('#js-date').val(),
    }
    console.log(newTodo);
    postTodo(newTodo);
    clearInput();
}

function getList() {
    $.ajax({
        method: "GET",
        url: "/api/todos"
    })
    .then((response) => {
        render(response);
    })
    .catch((err) => {
        console.warn(err);
    })
};

function postTodo(newTodo) {
    $.ajax({
        method: "POST",
        url: "/api/todos",
        data: newTodo
    })
    .then((response) => {
        getList();
    })
    .catch((err) => {
        console.warn(err);
    })
}

function deleteTodo() {
    const idNumber = $(this).data('id');

    $.ajax({
        method: "DELETE",
        url: '/api/todos/' + idNumber 
    })
    .then((response) => {
        getList();
    })
    .catch((response) => {
        console.warn(response);
    })
}

function updateTodo(status, id) {
    $.ajax({
        method: 'PUT',
        url: '/api/todos/' + id,
        data:  {
            status: status
        }
    })
    .then((response) => {
        console.log('PUT');
        getList();
    })
    .catch((err) => {
        console.warn(err);
    })
}


function done() {
    console.log('done');
    updateTodo('done', $(this).data('id'));
    
}

function notDone() {
    console.log('not done');
    updateTodo('not done', $(this).data('id'));
}

function render(list) {
    $('#js-list').empty();
    for(let item of list) {
        console.log(item);
        $('#js-list').append(`
        <tr id="tr">
        <td>${item.description}</td>
        <td>${item.status}</td>
        <td>${item.date}</td>
        <td>
          <button id="js-btn-done" class="btn btn-success" data-id="${item.id}">
            <i class="fas fa-angle-double-right"></i> Complete
          </button>
          <button id="js-btn-notdone" class="btn btn-warning" data-id="${item.id}">
            <i class="fas fa-angle-double-right"></i> Incomplete
          </button>
          <button id="js-btn-delete" class="btn btn-danger"  data-id="${item.id}">
            <i class="fas fa-angle-double-right"></i> Delete
          </button>
        </td>
      </tr>
        `)
    }
}

function clearInput() {
    $('#js-desc').val('');
    $('#js-date').val('');
}

   