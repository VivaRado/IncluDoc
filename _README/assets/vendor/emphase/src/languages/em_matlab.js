var lang = {
    name: "matlab",
    fnam: "Matlab",
    kwds: [
        "break",
        "case",
        "catch",
        "classdef",
        "continue",
        "else",
        "elseif",
        "end",
        "for",
        "function",
        "global",
        "if",
        "otherwise",
        "parfor",
        "persistent",
        "return",
        "spmd",
        "switch",
        "try",
        "while"
    ],
    dcvn: [],
    dcvs: [],
    lval: [
        "false",
        "true",
        "null"
    ],
    cmts: "%",
    cmtb: [
        {init: "%{", term: "%}", esc: "%"}
    ],
    strl: ["\"", "'"],
    strb: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }