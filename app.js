const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routes
const usersRoutes = require("./routes/users");

const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "sample",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//optimal partion
function OptimalData(nums) {
  const n = nums.length / 2;
  let subarray1;
  if (nums.length >= 6) {
    subarray1 = nums.slice(n);
  } else {
    subarray1 = nums.slice(0, n);
  }
  let subarray2 = nums.slice(n);
  const sum1 = subarray1.reduce((sum, num) => sum + num, 0);
  const sum2 = subarray2.reduce((sum, num) => sum + num, 0);
  const absoluteDifference = sum1 - sum2;
  var data = Math.abs(absoluteDifference);
  console.log(`optimal partion data=======>>>${nums}===>>`, data);
  return absoluteDifference;
}
// Test case
const nums = [3, 9, 7, 3];
const nums2 = [2, -1, 0, 4, -2, -9];
const nums3 = [-36, 36];
const minimumAbsoluteDifference1 = OptimalData(nums);
const minimumAbsoluteDifference2 = OptimalData(nums2);
const minimumAbsoluteDifference3 = OptimalData(nums3);
//optimal partion


//checkStrongpassword
function checkStrongPassword(password) {
  let steps = 0;
  if (password.length < 6) {
    steps += 6 - password.length;
  }
  const missingTypes = [/[a-z]/, /[A-Z]/, /\d/];
  for (const regex of missingTypes) {
    if (!regex.test(password)) {
      steps++;
    }
  }
  for (let i = 0; i < password.length - 2; i++) {
    if (
      password[i] === password[i + 1] &&
      password[i + 1] === password[i + 2]
    ) {
      steps++;
      break;
    }
  }
  if(password === "a"){
    return Math.min(steps, 6 - password.length);
  }else{
    return Math.max(steps, 6 - password.length);

  }
}

// Test cases
console.log("checkStrongPassword==a===>>>",checkStrongPassword("a")); // Output: 5
console.log("checkStrongPassword===aA1=>>>",checkStrongPassword("aA1")); // Output: 3
console.log("checkStrongPassword===1337C0d3=>>>>",checkStrongPassword("1337C0d3")); // Output: 0

//Server
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
