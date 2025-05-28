const Emphase = require("./cjs/emphase.js");
if (typeof window !== "undefined") {
	window.Emphase = Emphase;
} else {
	module.exports = Emphase
}