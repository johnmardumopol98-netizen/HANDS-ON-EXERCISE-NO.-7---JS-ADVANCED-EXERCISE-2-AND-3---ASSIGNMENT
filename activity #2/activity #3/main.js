import { fetchData } from "./modules.js";

document.addEventListener("DOMContentLoaded", () => {

    const loadBtn = document.getElementById("loadBtn");
    const clearBtn = document.getElementById("clearBtn");
    const table = document.getElementById("todoTable");
    const tableBody = document.getElementById("tableBody");

    const apiUrl = "https://jsonplaceholder.typicode.com/todos/";

    // Load API data on button click
    loadBtn.addEventListener("click", async () => {

        const todos = await fetchData(apiUrl);

        // Show table
        table.style.display = "table";
        tableBody.innerHTML = "";

        todos.forEach(todo => {
            const status = todo.completed ? "Completed" : "Not yet Completed";
            const statusClass = todo.completed ? "completed" : "notCompleted";

            const row = `
                <tr>
                    <td>${todo.userId}</td>
                    <td>${todo.id}</td>
                    <td>${todo.title}</td>
                    <td class="${statusClass}">${status}</td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });
    });

    // Clear table and hide
    clearBtn.addEventListener("click", () => {
        tableBody.innerHTML = "";
        table.style.display = "none";
    });
});