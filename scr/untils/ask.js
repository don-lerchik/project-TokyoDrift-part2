const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question, validator) =>
  new Promise((resolve) => {
    rl.question(`${question}`, async (answer) => {
      if (!validator(answer)) {
        console.log(`Oops , something wrong!\n Please enter correct command !\n`);
        await ask(question, validator);
      }
      resolve(answer);
    });
  });


module.exports = ask;
