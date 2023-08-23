import express from 'express';
const app = express();

app.use(express.json())
app.use(express.static("public"))
import { totalPhoneBill } from './totalPhoneBill.js';
import {enoughAirtime} from './enoughAirtime.js';

app.get('/longestWord/:sentence', (req, res) => {
  const sentence = req.params.sentence;
  const words = sentence.split(' ');
  let longestWord = '';
  for (let i = 0; i < words.length; i++) {
    if (words[i].length >= longestWord.length) {
      longestWord = words[i];
    }
  }
  res.send(longestWord);
});



app.get("/totalPhoneBill/:callsAndSms", (req, res) => {
  const callsAndSms = req.params.callsAndSms;
  const result = totalPhoneBill(callsAndSms);
  res.send(result);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.get('/shortestWord/:sentence', (req, res) => {
  const sentence = req.params.sentence;
  const words = sentence.split(' ');
  let shortestWord = words[0]; // initialize with the first word
  for (let i = 1; i < words.length; i++) {
    if (words[i].length <= shortestWord.length) {
      shortestWord = words[i];
    }
  }
  res.send(shortestWord);
});

app.get('/wordLengths/:sentence', (req, res) => {
  const sentence = req.params.sentence;
  const words = sentence.split(' ');
  let sum = 0;
  for (let i = 0; i < words.length; i++) {
    sum += words[i].length;
  }
  res.send(sum.toString()); // send the sum as a string
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//enough airtime
app.get('/enoughAirtime/callOrSms', (req, res) => {
  const usage = req.body.usage;
  const available = req.body.available;

  res.json({
      message: `usage: ${usage} and entered amount: ${available}`
  });
});


app.get('/api/enough', (req, res) => {
  const usage = req.query.usage;
  const available = req.query.available;


  res.json({
      result: enoughAirtime(usage, available)
  });
})