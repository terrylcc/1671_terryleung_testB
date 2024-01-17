const express = require("express");
const cors = require("cors");

const fs = require("fs");
const csv = require("fast-csv");

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'password',
    database: 'my_db'
})

connection.connect()

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.post("/data-migration", (req, res) => {
    const stream = fs.createReadStream(req.csvUrl)

    const csvData = [];
    const csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();

            // Create the table
            connection.query(`
                CREATE TABLE la_crime_2010_to_2023(
                    DR_NO varchar(255),
                    DATE_RPTD datetime,
                    DATE_OCC datetime,
                    TIME_OCC varchar(255),
                    AREA varchar(255),
                    AREA_NAME varchar(255),
                    Rpt_Dist_No varchar(255),
                    Crm_Cd_Desc varchar(255),
                    Vict_Age varchar(255),
                    Vict_Sex varchar(255),
                    Premis_Cd varchar(255),
                    Premis_Desc varchar(255),
                    Weapon_Used_Cd varchar(255),
                    Weapon_Desc varchar(255),
                    Status varchar(255),
                    Status_Desc varchar(255)
                )
            `)
  
            // Open the MySQL connection
            let query = `
                INSERT INTO la_crime_2010_to_2023 (
                    DR_NO, DATE_RPTD, DATE_OCC, TIME_OCC,
                    AREA, AREA_NAME, Rpt_Dist_No, Crm_Cd_Desc,
                    Vict_Age, Vict_Sex, Premis_Cd, Premis_Desc,
                    Weapon_Used_Cd, Weapon_Desc, Status, Status_Desc
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            for (var i = 0; i < csvData.length; i++) {
                let DR_NO = csvData[i]["DR_NO"]
                let DATE_RPTD = csvData[i]["Date Rptd"]
                let DATE_OCC = csvData[i]["DATE OCC"]
                let TIME_OCC = csvData[i]["TIME OCC"]
                let AREA = csvData[i]["AREA"]
                let AREA_NAME = csvData[i]["AREA NAME"]
                let Rpt_Dist_No = csvData[i]["Rpt Dist No"]
                let Crm_Cd_Desc = csvData[i]["Crm Cd Desc"]
                let Vict_Age = csvData[i]["Vict Age"]
                let Vict_Sex = csvData[i]["Vict Sex"]
                let Premis_Cd = csvData[i]["Premis Cd"]
                let Premis_Desc = csvData[i]["Premis Desc"]
                let Weapon_Used_Cd = csvData[i]["Weapon Used Cd"]
                let Weapon_Desc = csvData[i]["Weapon Desc"]
                let Status = csvData[i]["Status"]
                let Status_Desc = csvData[i]["Status Desc"]            
                
                connection.query(query, [
                    DR_NO, DATE_RPTD, DATE_OCC, TIME_OCC,
                    AREA, AREA_NAME, Rpt_Dist_No, Crm_Cd_Desc,
                    Vict_Age, Vict_Sex, Premis_Cd, Premis_Desc,
                    Weapon_Used_Cd, Weapon_Desc, Status, Status_Desc
                ], (error, response) => {
                    console.log(error || response);
                });
            }
        });
  
    stream.pipe(csvStream);
})

app.post("/search", (req, res) => {
    const data = req.body;

    const rows = connection.query(`
        SELECT DR_NO, DATE_RPTD, DATE_OCC, TIME_OCC,
            AREA, AREA_NAME, Rpt_Dist_No, Crm_Cd_Desc,
            Vict_Age, Vict_Sex, Premis_Cd, Premis_Desc,
            Weapon_Used_Cd, Weapon_Desc, Status, Status_Desc
            FROM la_crime_2010_to_2023
            WHERE DATE_OCC >= ${data.from_date}
            AND DATE_OCC <= ${data.to_date}
    `, (err, rows, fields) => {
        if (err) {
            throw err
        }

        return rows;
    })

    return rows.send(rows);
})

app.listen(port, () => console.log("The server is listening on port", port));