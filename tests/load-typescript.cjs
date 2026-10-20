const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Exercise the real route without adding a second TypeScript build or test framework.
module.exports = function loadTypescript(relativePath) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  loaded.require = (specifier) => {
    if (specifier.startsWith("@/")) {
      return loadTypescript(`${specifier.slice(2)}.ts`);
    }
    return module.require(specifier);
  };
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
  });
  loaded._compile(outputText, filename);
  return loaded.exports;
};
