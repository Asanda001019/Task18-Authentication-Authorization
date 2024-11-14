
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");  // Import CORS
const { db, bucket } = require("./firebaseConfig");
const express = require("express");

const app = express();

// Enable CORS
app.use(cors());  // Add CORS middleware
app.use(bodyParser.json());

const upload = multer({ storage: multer.memoryStorage() });

// Root route to check server status
app.get("/", (req, res) => {
  res.send("Welcome to the Employee Management System");
});

// Route to add a new employee
app.post("/employees", upload.single("picture"), async (req, res) => {
  console.log("Register endpoint hit"); // Log endpoint hit

  try {
    const employeeData = JSON.parse(req.body.employee);
    console.log("Employee data received:", employeeData); // Log employee data

    const file = req.file;
    let pictureUrl = "";

    if (file) {
      try {
        const blob = bucket.file(`employees/${file.originalname}`);
        const blobStream = blob.createWriteStream();
        blobStream.end(file.buffer);

        await new Promise((resolve, reject) => {
          blobStream.on("finish", resolve);
          blobStream.on("error", reject);
        });

        pictureUrl = `https://storage.googleapis.com/${bucket.name}/employees/${file.originalname}`;
        console.log("Picture URL:", pictureUrl); // Log picture URL
      } catch (error) {
        console.error("Error uploading picture:", error);
      }
    }

    const newEmployee = {
      ...employeeData,
      picture: pictureUrl,
    };

    const docRef = await db.collection("employees").add(newEmployee);
    res.status(201).send({ id: docRef.id, ...newEmployee });
    console.log("Employee registered successfully:", { id: docRef.id, ...newEmployee }); // Log success
  } catch (error) {
    console.error("Error in registration:", error); // Log error
    res.status(500).send(error);
  }
});

// Route to retrieve all employees
app.get("/employees", async (req, res) => {
  try {
    const snapshot = await db.collection("employees").get();
    const employees = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(employees);
  } catch (error) {
    console.error("Error fetching employees:", error); // Log error
    res.status(500).send(error);
  }
});

// Route to retrieve a specific employee by ID
app.get("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const doc = await db.collection("employees").doc(employeeId).get();

    if (!doc.exists) {
      return res.status(404).send("Employee not found");
    }

    res.send({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching employee:", error); // Log error
    res.status(500).send(error);
  }
});

// Route to update an employee
app.put("/employees/:id", upload.single("picture"), async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeData = JSON.parse(req.body.employee);
    const file = req.file;
    let pictureUrl = employeeData.picture || "";

    if (file) {
      try {
        const blob = bucket.file(`employees/${file.originalname}`);
        const blobStream = blob.createWriteStream();
        blobStream.end(file.buffer);

        await new Promise((resolve, reject) => {
          blobStream.on("finish", resolve);
          blobStream.on("error", reject);
        });

        pictureUrl = `https://storage.googleapis.com/${bucket.name}/employees/${file.originalname}`;
        console.log("Updated picture URL:", pictureUrl); // Log picture URL
      } catch (error) {
        console.error("Error uploading updated picture:", error); // Log error
      }
    }

    const updatedEmployee = {
      ...employeeData,
      picture: pictureUrl,
    };

    await db.collection("employees").doc(employeeId).set(updatedEmployee, { merge: true });
    res.send({ id: employeeId, ...updatedEmployee });
    console.log("Employee updated successfully:", { id: employeeId, ...updatedEmployee }); // Log success
  } catch (error) {
    console.error("Error updating employee:", error); // Log error
    res.status(500).send(error);
  }
});

// Route to delete an employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    await db.collection("employees").doc(employeeId).delete();
    res.send({ message: "Employee deleted successfully" });
    console.log("Employee deleted successfully:", employeeId); // Log success
  } catch (error) {
    console.error("Error deleting employee:", error); // Log error
    res.status(500).send(error);
  }
});

// Start server and print welcome message
const PORT = process.env.PORT || 3001;
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
  console.log("Welcome to the Employee Management System"); // Your welcome message
});






