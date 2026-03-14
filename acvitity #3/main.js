document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loadDataBtn").addEventListener("click", async () => {
        const apiUrl = "https://jsonplaceholder.typicode.com/todos/";
        try {
            const fetchedData = await fetchData(apiUrl);
            console.log("Fetched Data:", fetchedData);
            displayData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });

    document.getElementById("clearTableBtn").addEventListener("click", () => {
        clearTable();
    });

    function displayData(data) {
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        const headers = ["User ID", "Task ID", "Title", "Status"];

        const headerRow = table.insertRow();
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            th.style.border = "1px solid black";
            th.style.textAlign = "center";
            headerRow.appendChild(th);
        });

        data.forEach(item => {
            const row = table.insertRow();
            row.style.border = "1px solid black";

            const userIdCell = row.insertCell();
            userIdCell.textContent = item.userId;
            userIdCell.style.border = "1px solid black"; 
            userIdCell.style.textAlign = "center";

            const taskIdCell = row.insertCell();
            taskIdCell.textContent = item.id;
            taskIdCell.style.border = "1px solid black"; 
            taskIdCell.style.textAlign = "center";

            const titleCell = row.insertCell();
            titleCell.textContent = item.title;
            titleCell.style.border = "1px solid black";
            titleCell.style.textAlign = "center";

            const statusCell = row.insertCell();
            statusCell.textContent = item.completed ? "Completed" : "Not yet completed";
            statusCell.style.color = item.completed ? "green" : "red";
            statusCell.style.border = "1px solid black"; 
            statusCell.style.textAlign = "center";
        });

        document.body.appendChild(table);
    }

    function clearTable() {
        const table = document.querySelector("table");
        if (table) {
            table.remove();
            console.log("Table cleared.");
        } else {
            console.log("No table to clear.");
        }
    }

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
});
