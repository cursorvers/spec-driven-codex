const readline = require('node:readline/promises');
const { stdin: defaultInput, stdout: defaultOutput } = require('node:process');

function createYesNoPrompt({ input = defaultInput, output = defaultOutput } = {}) {
  return async function ask(message) {
    const rl = readline.createInterface({ input, output });
    try {
      const answer = await rl.question(`${message} (y/n): `);
      return answer.trim().toLowerCase().startsWith('y');
    } finally {
      rl.close();
    }
  };
}

module.exports = { createYesNoPrompt };
