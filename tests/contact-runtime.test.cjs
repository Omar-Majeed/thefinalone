const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const { test } = require("node:test");
const ts = require("typescript");

// Run with --no-experimental-require-module to reproduce the CommonJS loading
// failure seen in Vercel, even on local Node versions that support require(ESM).
// Upstream workaround: https://github.com/kkomelin/isomorphic-dompurify/issues/394
const filename = path.resolve(__dirname, "../lib/contact/sanitize.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
});
const sanitizerModule = new Module(filename, module);
sanitizerModule.filename = filename;
sanitizerModule.paths = Module._nodeModulePaths(path.dirname(filename));
sanitizerModule._compile(compiled.outputText, filename);
const { sanitizeText, sanitizeMultiline, sanitizeContactFields } =
  sanitizerModule.exports;

test("contact dependencies load without CommonJS-to-ESM interop", () => {
  assert.equal(typeof sanitizeText, "function");
  assert.equal(typeof require("resend").Resend, "function");
  assert.ok(require("@react-email/components").Html);
});

test("removes markup, scripts, styles, and event handlers", () => {
  assert.equal(
    sanitizeText(
      '<script>alert(1)</script><style>body{display:none}</style>' +
        '<img src=x onerror=alert(1)><b onclick="alert(1)">Hello</b> world',
    ),
    "Hello world",
  );
  assert.equal(
    sanitizeText('<svg onload="alert(1)"></svg><a href="javascript:alert(1)">Hello</a>'),
    "Hello",
  );
});

test("preserves ordinary inquiry text and normalizes whitespace", () => {
  assert.equal(sanitizeText("  Omar\t Majeed\n "), "Omar Majeed");
  assert.equal(sanitizeText("Café — مرحبا"), "Café — مرحبا");
  assert.equal(sanitizeText("customer+web@example.com"), "customer+web@example.com");
  assert.equal(
    sanitizeMultiline("  First\t line\r\n\r\n\r\nSecond  line  "),
    "First line\n\nSecond line",
  );
});

test("sanitizes the complete contact payload without losing message lines", () => {
  assert.deepEqual(
    sanitizeContactFields({
      name: "<b>Omar</b>",
      email: "customer@example.com",
      company: "<img src=x onerror=alert(1)>Example",
      projectType: "Web Development",
      message: "<b>Build a website.</b>\nPlease get in touch.",
    }),
    {
      name: "Omar",
      email: "customer@example.com",
      company: "Example",
      projectType: "Web Development",
      message: "Build a website.\nPlease get in touch.",
    },
  );
});
