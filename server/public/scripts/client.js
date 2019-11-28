console.log('js');
$(document).ready(init);

function init() {
    console.log('JQ');
    getList();
    $('#js-btn-save').on('click', saveTodo);

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

function render(list) {
    $('#js-list').empty();
    for(let item of list) {
        console.log(item);
        $('#js-list').append(`
        <tr>
        <td>${item.id}</td>
        <td>${item.description}</td>
        <td>${item.status}</td>
        <td>${item.date}</td>
        <td>
          <button class="btn btn-success">
            <i class="fas fa-angle-double-right"></i> Complete
          </button>
          <button class="btn btn-danger">
            <i class="fas fa-angle-double-right"></i> Delete
          </button>
        </td>
      </tr>
        `)
    }
}

function clearInput() {
    $('.form-control').val('');
}

   