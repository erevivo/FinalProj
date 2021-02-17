async function deleteUser(event) {
    if (!adding) {
        alertServerError();
        return;
    }
    loading(true);
    fetch("/users/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: event.data.email,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            loading(false);
            console.log(data);
            if (data.success) {
                $("#deleteUserModal").modal("toggle");
            }
        })
        .catch(disableChanges);
}

function prepareDelete(name, email) {
    $('#deleteUserBody').text(`Are you sure you want to delete ${name}?`);
    $("#confirmDelete").bind('click', {
        email: email
    }, deleteUser);
}
async function promoteUser(event) {
    if (!adding) {
        alertServerError();
        return;
    }
    loading(true);
    fetch("/users/promote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: event.data.email,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            loading(false);
            if (data.success) {
                $("#promoteModal").modal("toggle");
            }
        })
        .catch(disableChanges);
}

async function demoteUser(event) {
    if (!adding) {
        alertServerError();
        return;
    }
    loading(true);
    fetch("/users/demote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: event.data.email,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            loading(false);
            if (data.success) {
                $("#demoteModal").modal("toggle");
            }
        })
        .catch(disableChanges);
}


function preparePromote(name, email) {
    $('#promoteBody').text(`Are you sure you want to promote ${name}?`);
    $("#confirmPromote").bind('click', {
        email: email
    }, promoteUser);
}

function prepareDemote(name, email) {
    $('#demoteBody').text(`Are you sure you want to demote ${name}?`);
    $("#confirmDemote").bind('click', {
        email: email
    }, demoteUser);
}
async function createEmployee() {
    if (!adding) {
        alertServerError();
        return;
    }
    let password = $(passwordAddEmployee).val();
    if (password != $(passwordAddEmployeeConfirm).val()) {
        return;
    }
    let fname = $(fnameAddEmployee).val();
    let lname = $(lnameAddEmployee).val();
    let email = $(emailAddEmployee).val();
    let salary = $(salaryAddEmployee).val();
    let branch = $(branchAddEmployee).val();
    loading(true);
    fetch("/users/createEmployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                fname: fname,
                lname: lname,
                salary: salary,
                branch: branch
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            loading(false);
            console.log(data);
            if (data.success) {
                $("#addEmployeeModal").modal("toggle");
                $(".form-group input").val('');
            }
        })
        .catch(disableChanges);
}