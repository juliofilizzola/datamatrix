import { PythonShell } from "python-shell";
import { execSync } from "node:child_process";
import path from "node:path";
import { QrCode } from "./dto/typeQrCode";
import * as fs from "node:fs";

const libDir = path.resolve(__dirname, "../lib");
const requirementsPath = path.join(libDir, "requirements.txt");

const installDependencies = async () => {
  try {
    execSync(`pip install -r ${requirementsPath}`, { stdio: "ignore" });
  } catch(err) {
    console.error(err)
  }
}

const imageToBinary = (imagePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const binaryString = data.toString('binary');
        resolve(binaryString);
      }
    });
  });
};

export const generateQrCode = async (type: QrCode, message: string): Promise<string> => {
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
    test.send(message);
    test.end((err, code, signal) => {
      if (err) console.error(err);
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
    });
    return imageToBinary(`../dmtx.png`);
  } catch(err) {
    console.error(err)
  }
};
