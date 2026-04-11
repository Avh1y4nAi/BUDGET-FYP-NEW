const { spawn } = require('child_process');
const path = require('path');

console.log(" DIAGNOSTIC: Starting backend server check...");

const serverProcess = spawn('node', ['server.js'], {
  cwd: __dirname,
  stdio: 'pipe'
});

let outputData = "";
let errorData = "";

serverProcess.stdout.on('data', (data) => {
  outputData += data.toString();
  console.log(`[Server Log]: ${data.toString().trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  errorData += data.toString();
  console.log(`[Server Error]: ${data.toString().trim()}`);
});

// Let it run for 5 seconds then check
setTimeout(() => {
  if (serverProcess.exitCode !== null) {
    console.log("\n DIAGNOSTIC RESULT: Server crashed immediately.");
    console.log("Crash Reason (stderr):", errorData || "No error output captured.");
  } else {
    if (outputData.includes("Server running on port 5000")) {
      console.log("\n DIAGNOSTIC RESULT: Server started successfully!");
      console.log("It is listening on port 5000.");
      console.log("If you still get Proxy Error, ensure you leave this terminal running.");
    } else {
      console.log("\n DIAGNOSTIC RESULT: Server is running but didn't print success message yet.");
    }
    serverProcess.kill(); // Stop the test server
  }
}, 5000);
