/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS loader executes the real TS modules without an extra runtime dependency. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const ts = require("typescript");
const QRCode = require("qrcode");

// Load the real TypeScript data/utility modules without adding a test dependency.
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
};
const { makeVCard, resolveProfileUrl, LEGACY_CARD_URL } = require("../src/lib/card-profile.ts");
const { contact: francis } = require("../src/config/contact.ts");
const { joseContact: jose } = require("../src/config/jose-noguera.ts");

test("Francis vCard remains byte-for-byte compatible", () => {
  assert.equal(makeVCard(francis), [
    "BEGIN:VCARD", "VERSION:3.0", "N:Lucena;Francis;;;", "FN:Francis Lucena",
    "ORG:ECOVERSE", "TITLE:Ejecutiva de Ventas", "TEL;TYPE=CELL,VOICE:+17862738717",
    "URL:https://www.ecoverseusa.com", "END:VCARD",
  ].join("\r\n"));
});

test("José exports only his identity and profile URL, with no invented contacts", () => {
  const vcard = makeVCard(jose);
  assert.ok(vcard.includes("N:Noguera;José;;;\r\nFN:José Noguera"));
  assert.ok(vcard.includes("TITLE:Regional Manager"));
  assert.ok(vcard.includes(`URL:${jose.productionUrl}`));
  assert.doesNotMatch(vcard, /FN:Francis|N:Lucena|17862738717|TEL[;:]|EMAIL[;:]|wa\.me/i);
  assert.equal(new URL(jose.productionUrl).pathname, "/jose-noguera");
  assert.equal(jose.slug, "jose-noguera");
  for (const key of ["phone", "whatsapp", "email", "biography", "portrait"]) assert.equal(jose[key], "");
  assert.deepEqual(jose.socialLinks, []);
  assert.deepEqual(jose.testimonials, []);
});

test("profile URL replaces any legacy or mistaken profile path, query and hash", () => {
  for (const source of ["https://cards.example/francis-lucena?person=francis#contact", "https://cards.example/", "https://cards.example/another-profile"]) {
    assert.equal(resolveProfileUrl("/jose-noguera", source), "https://cards.example/jose-noguera");
  }
  assert.equal(resolveProfileUrl("/jose-noguera", "https://jose.example/wrong", "https://legacy.example"), "https://jose.example/jose-noguera");
});

test("missing, placeholder and unsafe URLs fall through safely", () => {
  for (const source of [undefined, "", "https://TU-URL-PUBLICA-AQUI", "not a url", "javascript:alert(1)"]) {
    assert.equal(resolveProfileUrl("/jose-noguera", source), `${LEGACY_CARD_URL}/jose-noguera`);
  }
  assert.equal(resolveProfileUrl("/jose-noguera", "https://TU-URL-PUBLICA-AQUI", "https://production.example"), "https://production.example/jose-noguera");
});

test("QR encoding contains José's exact profile URL", async () => {
  const qr = QRCode.create(jose.productionUrl, { errorCorrectionLevel: "H" });
  const payload = qr.segments.map(segment => typeof segment.data === "string" ? segment.data : Buffer.from(segment.data).toString("utf8")).join("");
  assert.equal(payload, jose.productionUrl);
  assert.ok(payload.endsWith("/jose-noguera"));
  assert.match(await QRCode.toDataURL(jose.productionUrl), /^data:image\/png;base64,/);
});

test("vCard escapes line breaks and delimiters without injecting contact fields", () => {
  const vcard = makeVCard({ ...jose, jobTitle: "Manager\r\nTEL:123;test,other" });
  assert.ok(vcard.includes("TITLE:Manager\\nTEL:123\\;test\\,other"));
  assert.doesNotMatch(vcard, /\r\nTEL:/);
});

