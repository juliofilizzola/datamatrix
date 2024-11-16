import { PythonShell } from "python-shell";
import { execSync } from "node:child_process";
import path from "node:path";

const libDir = path.resolve(__dirname, "../lib");
const requirementsPath = path.join(libDir, "requirements.txt");

const installDependencies = async () => {
  try {
    execSync(`pip install -r ${requirementsPath}`, { stdio: "inherit" });
  } catch(err) {
    console.error(err)
  }
}

const main = async () => {
  await installDependencies();
  try {
    return PythonShell.run('lib/service/QrCode.py', {
      args: ['https://www.google.com'],
      pythonPath: 'python3',
    })
  } catch(err) {
    console.error(err)
  }
};

main().then(() => console.log('done')).catch(console.error);