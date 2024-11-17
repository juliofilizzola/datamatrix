import { PythonShell } from "python-shell";
import { execSync } from "node:child_process";
import path from "node:path";

const libDir = path.resolve(__dirname, "../lib");
const requirementsPath = path.join(libDir, "requirements.txt");

const installDependencies = async () => {
  try {
    execSync(`pip install -r ${requirementsPath}`, { stdio: "ignore" });
  } catch(err) {
    console.error(err)
  }
}

const main = async () => {
  await installDependencies();
  try {
    const test = new PythonShell(
      `${libDir}/node.py`,
      {
        mode: 'text',
        pythonOptions: ['-u'],
        pythonPath: 'python',
      }
    );
    test.send({ message: 'hello' });
    test.end((err, code, signal) => {
      if (err) console.error(err);
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
    });
    return test
  } catch(err) {
    console.error(err)
  }
};

main().then(() => console.log('done')).catch(console.error);