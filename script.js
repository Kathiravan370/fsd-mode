const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());
const filePath = path.join(__dirname, "students.json");
app.get("/students", (req, res) => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const students = JSON.parse(data);
        res.json(students);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.delete("/students/:studentId", (req, res) => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        let students = JSON.parse(data);
        const studentId = req.params.studentId;
        const newStudents = students.filter(
            student => student.studentId !== studentId
        );
        if (students.length === newStudents.length) {
            return res.json({
                message: "Student not found"
            });
        }
            fs.writeFileSync(
            filePath,
            JSON.stringify(newStudents, null, 2)
        );
        res.json({
            message: "Student deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});