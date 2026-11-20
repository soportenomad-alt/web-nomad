const fs = require('fs');
const raw = fs.readFileSync(__dirname + '/pruebas/catalogo_pruebas.json', 'utf8');
const data = JSON.parse(raw);
const out = 'var CATALOGO_DATA = ' + JSON.stringify(data, null, 2) + ';\n' +
            'if (typeof window !== "undefined") { window.CATALOGO_DATA = CATALOGO_DATA; }\n' +
            'if (typeof module !== "undefined" && module.exports) { module.exports = CATALOGO_DATA; }\n';
fs.writeFileSync(__dirname + '/catalogo-data.js', out, 'utf8');
console.log('catalogo-data.js built successfully');
