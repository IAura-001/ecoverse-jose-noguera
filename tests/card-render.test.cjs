/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the real TSX server render without another test dependency. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function loadTS(module, filename) {
  let output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  output = output.replace(/require\("@\/([^"\n]+)"\)/g, (_, relative) => `require(${JSON.stringify(path.resolve(__dirname, "../src", relative))})`);
  module._compile(output, filename);
}
require.extensions[".ts"] = loadTS;
require.extensions[".tsx"] = loadTS;
require.extensions[".css"] = (module) => { module.exports = {}; };
const { JoseCard } = require("../src/app/jose-noguera/jose-card.tsx");
const { ProfileSheet } = require("../src/app/jose-noguera/profile-sheet.tsx");
const { joseContact } = require("../src/config/jose-noguera.ts");

test("main card renders essential actions without mounted supporting sections or overlays", () => {
  const html = renderToStaticMarkup(React.createElement(JoseCard, { contact: joseContact }));
  for (const label of ["José Noguera", "Regional Manager", "Llamar", "WhatsApp", "Contacto", "Testimonios", "Retrato próximamente"]) assert.ok(html.includes(label), label);
  assert.doesNotMatch(html, /<dialog|<blockquote|<section|<footer|Biografía profesional|Francis Lucena|17862738717/);
  assert.match(html, /ecoverse%2Fproduct.png|ecoverse\/product.png/);
  assert.match(html, /<footer/);
  assert.doesNotMatch(html, /aquafriendly|Mao8tzhUoP7uYgKF6|LiujNRYbod8yVGJH6/i);
  assert.doesNotMatch(html, /href="(?:tel:|mailto:|https:\/\/wa\.me)/);
});

test("empty testimonials show explicit unpublished previews and both navigation controls", () => {
  const html = renderToStaticMarkup(React.createElement(ProfileSheet, { kind: "testimonials", contact: joseContact, onClose() {} }));
  assert.match(html, /<dialog/);
  assert.match(html, /Vista previa · Sin publicar/);
  assert.match(html, /Nombre pendiente/);
  for (const label of ["Cerrar", "Testimonio anterior", "Siguiente testimonio"]) assert.ok(html.includes(`aria-label="${label}"`));
  assert.doesNotMatch(html, /de 5 estrellas/);
});

test("published testimonial renders supplied quote, attribution, context and optional rating", () => {
  const contact = { ...joseContact, testimonials: [{ quote: "TEST QUOTE", name: "TEST NAME", context: "TEST CONTEXT", rating: 4.5 }] };
  const html = renderToStaticMarkup(React.createElement(ProfileSheet, { kind: "testimonials", contact, onClose() {} }));
  for (const text of ["TEST QUOTE", "TEST NAME", "TEST CONTEXT", "4.5 de 5 estrellas"]) assert.ok(html.includes(text));
  assert.doesNotMatch(html, /Sin publicar|Nombre pendiente/);
  assert.equal((html.match(/disabled=""/g) || []).length, 2);
});

test("contact sheet exposes pending personal fields without borrowing Francis details", () => {
  const html = renderToStaticMarkup(React.createElement(ProfileSheet, { kind: "contact", contact: joseContact, onClose() {} }));
  for (const label of ["Teléfono", "WhatsApp", "Correo electrónico", "Redes sociales", "Próximamente"]) assert.ok(html.includes(label));
  assert.doesNotMatch(html, /Francis|17862738717|href="(?:tel:|mailto:|https:\/\/wa\.me)/);
});
