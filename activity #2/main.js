const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const btnSave = document.getElementById("btnSave");

const tblRecords = document.getElementById("tblRecords");
const bottomControls = document.getElementById("bottomControls");

const sortField = document.getElementById("sortField");
const sortOrder = document.getElementById("sortOrder");

let arrRecords = [];

const tblTHsLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];



let savedData = localStorage.getItem("records");

if (savedData) {
    arrRecords = JSON.parse(savedData);
    iterateRecords();
}



btnInsertUpdate.addEventListener("click", () => {

    const inputs = document.getElementsByTagName("input");

    for (const txt of inputs) {

        if (txt.value.trim() == "") {
            alert("Please complete all inputs!");
            return;
        }

    }

    if (btnInsertUpdate.value == "insert") {

        let record = {

            fname: inputs[0].value,
            mname: inputs[1].value,
            lname: inputs[2].value,
            age: parseInt(inputs[3].value)

        };

        arrRecords.push(record);

    }
    else {

        let i = parseInt(btnInsertUpdate.value);

        arrRecords[i].fname = inputs[0].value;
        arrRecords[i].mname = inputs[1].value;
        arrRecords[i].lname = inputs[2].value;
        arrRecords[i].age = parseInt(inputs[3].value);

    }

    for (const txt of inputs) {
        txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

    sortRecords();
    iterateRecords();

});



btnClear.addEventListener("click", () => {

    const inputs = document.getElementsByTagName("input");

    for (const txt of inputs) {
        txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

});



btnClearItems.addEventListener("click", () => {

    arrRecords = [];

    while (tblRecords.firstChild) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    document.getElementById("status").style.display = "inline";
    bottomControls.style.display = "none";

});



btnSave.addEventListener("click", () => {

    localStorage.setItem("records", JSON.stringify(arrRecords));
    alert("Records saved!");

});



function iterateRecords() {

    while (tblRecords.firstChild) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    if (arrRecords.length == 0) {

        document.getElementById("status").style.display = "inline";
        bottomControls.style.display = "none";
        return;

    }

    document.getElementById("status").style.display = "none";
    bottomControls.style.display = "block";


    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    headerRow.style.borderTop = "2px solid black";
    headerRow.style.borderBottom = "2px solid black";

    for (let i = 0; i < tblTHsLabels.length; i++) {

        const th = document.createElement("th");

        th.innerHTML = tblTHsLabels[i];
        th.style.padding = "6px 15px";

        if (i != tblTHsLabels.length - 1) {
            th.style.borderRight = "1px solid black";
        }

        headerRow.appendChild(th);

    }

    thead.appendChild(headerRow);
    tblRecords.appendChild(thead);


    const tbody = document.createElement("tbody");

    arrRecords.forEach((rec, i) => {

        const tr = document.createElement("tr");

        tr.style.borderBottom = "1px solid gray";

        tr.appendChild(createCell(rec.fname));
        tr.appendChild(createCell(rec.mname));
        tr.appendChild(createCell(rec.lname));
        tr.appendChild(createCell(rec.age));


        const action = document.createElement("td");
        action.style.padding = "6px";

        const btnDel = document.createElement("button");
        btnDel.innerHTML = "Delete";
        btnDel.onclick = () => deleteData(i);

        const btnEdit = document.createElement("button");
        btnEdit.innerHTML = "Edit";
        btnEdit.onclick = () => updateData(i);

        action.appendChild(btnDel);
        action.appendChild(btnEdit);

        tr.appendChild(action);

        tbody.appendChild(tr);

    });

    tblRecords.appendChild(tbody);

}


function createCell(value) {

    const td = document.createElement("td");

    td.style.padding = "6px 15px";
    td.style.borderRight = "1px solid black";

    td.innerHTML = value;

    return td;

}



function deleteData(i) {

    arrRecords.splice(i, 1);

    iterateRecords();

}



function updateData(i) {

    const inputs = document.getElementsByTagName("input");

    inputs[0].value = arrRecords[i].fname;
    inputs[1].value = arrRecords[i].mname;
    inputs[2].value = arrRecords[i].lname;
    inputs[3].value = arrRecords[i].age;

    btnInsertUpdate.innerHTML = "Update";
    btnInsertUpdate.value = i;

}


sortField.addEventListener("change", sortRecords);
sortOrder.addEventListener("change", sortRecords);

function sortRecords() {

    const field = sortField.value;
    const order = sortOrder.value;

    arrRecords.sort((a, b) => {

        let A = a[field];
        let B = b[field];

        if (field == "age") {
            return order == "asc" ? A - B : B - A;
        }

        A = A.toLowerCase();
        B = B.toLowerCase();

        return order == "asc" ? A.localeCompare(B) : B.localeCompare(A);

    });

    iterateRecords();

}