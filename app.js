const { spawn } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express/lib/response');

const interactshClientPath = "interactsh-client"
const subProcess = spawn(interactshClientPath);
const app = express();
const interactshURL = '';

app.use(bodyParser.json());

let shuru = '', accumulatedData = '';
const interactionArr = [];
let acc = {};
subProcess.stdout.on('data', (data) => {
  // console.log(`stdout:\n${data}`);

  let x = data.toString();
  // console.log("start " + x + " end ");
  // const logData = "[cmr5gbv2icekc25popigndwykga9dm7j4] Received DNS interaction (AAAA) from 106.77.174.195 at 2024-01-28 13:35:55\n[cmr5gbv2icekc25popigndwykga9dm7j4] Received DNS interaction (AAAA) from 106.77.174.195 at 2024-01-28 13:35:56";

  // Split the log data into individual lines
  const logLines = x.split('\n');

  // Create an object to store interactions with timestamps
  
  const interactionsObject={};
  // Iterate over each line and extract timestamp and interaction
  logLines.forEach((line) => {
    const match = line.match(/\[.*\] Received (.*) from .* at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
    // console.log(match);
    if (match) {
      const interaction = match[0];
      const timestamp = match[2];
      interactionsObject[timestamp] = interaction;
      interactionArr.push(interactionsObject);
    }
  });

  // console.log(interactionsObject);

  // console.log(accumulatedData);

});

subProcess.stderr.on('data', (data) => {
  const chunk = data.toString();
  console.log("start", chunk, "end");

  // accumulatedData += chunk; // Accumulate data across chunks

  let x = chunk.split(' ')
  // const urlMatch = accumulatedData.match(/\[INF\] Listing 1 payload for OOB Testing\n\[INF\] (.+)$/m);
  // console.log("urlMatch", x[x.length - 1]);

  shuru = x[x.length - 1];

  shuru = shuru.slice(0, -1)


  // if (urlMatch && urlMatch[1]) {
  //   interactshURL = urlMatch[1];
  //   console.log(`Interactsh URL: ${interactshURL}`);
  //   // Reset accumulatedData after finding the URL
  //   accumulatedData = '';
  // }

  // console.error(`stderr ${data}`);
});
subProcess.on('error', (error) => {
  console.error(`error: ${error.message}`);
});
subProcess.on('close', (code) => {
  console.log(`child process salida ${code}`);
});

app.get('/api/getURL', (req, res) => {
  res.json({ shuru })
})


app.post('/api/getInteractions', (req, res) => {
  const { url, start, end } = req.body;

  let filteredInteractions = [...interactionArr];


  if (start && end) {
    // Filter by start and end timestamps
    filteredInteractions = filteredInteractions.filter(interaction => {
      console.log(interaction);
      const timestamp = Object.keys(interaction)[0];
      return timestamp >= start && timestamp <= end;
    });
  } else if (start) {
    // Filter by start timestamp only
    filteredInteractions = filteredInteractions.filter(interaction => {
      const timestamp = Object.keys(interaction)[0];
      return timestamp >= start;
    });
  } else if (end) {
    // Filter by end timestamp only
    filteredInteractions = filteredInteractions.filter(interaction => {
      const timestamp = Object.keys(interaction)[0];
      return timestamp <= end;
    });
  }

  res.json(filteredInteractions);
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on ${port}`)
})
