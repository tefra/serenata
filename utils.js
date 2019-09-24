const path = require('path');
const fs = require('fs');

const samplesDirectory = path.join(__dirname, 'samples');
const samples = fs.readdirSync(samplesDirectory);

const fetchRandomSample = () => {
  if (!samples.length) return '';
  const randomIndex = Math.floor(Math.random() * samples.length);
  const file = path.join(samplesDirectory, samples[randomIndex]);
  return fs.readFileSync(file).toString();
};

module.exports = {
  fetchRandomSample,
};
