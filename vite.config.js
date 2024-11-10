import { crx } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import manifest from "./manifest.json";
import vitePluginRunCommandOnDemand from "./vite-plugins";
import { exec } from "child_process";
import fs from "fs";
import { createRequire } from "module";

function forceDisableUseDynamicUrl(done) {
  const require = createRequire(import.meta.url);
  const manifest = require("./manifest.json");
  manifest.web_accessible_resources.forEach((resource) => {
    delete resource.use_dynamic_url;
  });
  if (!fs.existsSync("./manifest.json")) {
    return done();
  }
  fs.writeFileSync("./manifest.json", JSON.stringify(manifest, null, 2));
  done();
}

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${stderr}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
};

export default defineConfig({
  plugins: [
    crx({ manifest }),
    vitePluginRunCommandOnDemand({
      afterServerStart: () => runCommand("pnpm run forceDisableUseDynamicUrl"),
      closeBundle: () => runCommand("pnpm run forceDisableUseDynamicUrl"),
    }),
  ],
});
