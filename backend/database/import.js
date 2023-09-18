let csvFileInput;
document.getElementById(csvFileInput).addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvText = e.target.result;
            const rows = csvText.split('\n');
            const data = [];

            for (const row of rows) {
                const values = row.split(',');                
                data.push(values);
            }

            console.log(data);
            displayCSVData(data);
        };

        reader.readAsText(file);
    }
}

function displayCSVData(data) {
    let tableid;
    
    const csvDataDiv = document.getElementById(tableid);
    csvDataDiv.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'csv-table';

    for (const row of data) {
        const tr = document.createElement('tr');
        for (const value of row) {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    csvDataDiv.appendChild(table);
}

// Function to insert data into the database table
function insertDataIntoTable(data) {
    data.forEach((row) => {
      const query = 'INSERT INTO your_table_name (name, email, password, role, class) VALUES (?, ?, ?, ?, ?)';
      const values = row; // Assuming the order of values in the row matches the order of columns in the table
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Error inserting data: ', err);
        } else {
          console.log('Data inserted successfully');
        }
      });
    });
}