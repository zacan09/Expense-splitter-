let people = [];        
let expenses = [];      


document.getElementById("enter").addEventListener("click", function () {
    let input = document.querySelector("#names input");
    let name = input.value.trim();

    if (name === "") {
        alert("Enter a valid name");
        return;
    }

    
    people.push(name);
    input.value = "";

    updatePeopleList();
    updateCheckboxes();
});


function updatePeopleList() {
    let ul = document.getElementById("list of people");
    ul.innerHTML = "";

    people.forEach((person) => {
        let li = document.createElement("li");
        li.textContent = person;
        ul.appendChild(li);
    });
}

function updateCheckboxes() {
    let boxArea = document.getElementById("checkboxes");
    boxArea.innerHTML = "";

    people.forEach((person) => {
        let div = document.createElement("div");

        div.innerHTML = `
            <label>
                <input type="checkbox" value="${person}">
                ${person}
            </label>
        `;

        boxArea.appendChild(div);
    });
}


document.getElementById("add-expense-btn").addEventListener("click", function () {
    let expName = document.getElementById("expense name").value.trim();
    let amount = Number(document.getElementById("total amount").value);

    if (expName === "" || amount <= 0) {
        alert("Enter valid expense details");
        return;
    }


    let selectedPeople = [];
    document
        .querySelectorAll("#checkboxes input:checked")
        .forEach((checkbox) => selectedPeople.push(checkbox.value));

    if (selectedPeople.length === 0) {
        alert("Select at least one person");
        return;
    }

    expenses.push({
        name: expName,
        amount: amount,
        people: selectedPeople,
        splitAmount: amount / selectedPeople.length
    });

    document.getElementById("expense name").value = "";
    document.getElementById("total amount").value = "";

    showSummary();
});





function showSummary() {
    let summaryDiv = document.getElementById("summary-output");
    summaryDiv.innerHTML = "";

    if (expenses.length === 0) {
        summaryDiv.innerHTML = "<p>No expenses added yet.</p>";
        return;
    }

    let totalByPerson = {};

    
    people.forEach((p) => (totalByPerson[p] = 0));

    
    expenses.forEach((exp) => {
        exp.people.forEach((p) => {
            totalByPerson[p] += exp.splitAmount;
        });
    });

    let html = "<h3>Total Amount Each Person Should Pay:</h3><ul>";

    for (let person in totalByPerson) {
        html += `<li><strong>${person}:</strong> ₹${totalByPerson[person].toFixed(2)}</li>`;
    }

    html += "</ul>";

    summaryDiv.innerHTML = html;
}
