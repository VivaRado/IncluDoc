var lang = {
    name: "go",
    fnam: "Go",
    kwds: [
        "break",
        "default",
        "func",
        "interface",
        "select",
        "case",
        "defer",
        "go",
        "map",
        "struct",
        "chan",
        "else",
        "goto",
        "switch",
        "const",
        "fallthrough",
        "if",
        "range",
        "type",
        "continue",
        "for",
        "return",
        "var"     
    ],
    dcvn: [],
    dcvs: [
        "package",
        "import"
    ],
    cmts: "//",
    cmtb: [
        {init: "/*", term: "*/", esc: "*"}
    ],
    lval: [
        "false",
        "true",
        "null"
    ],
    strl: ["\"", "'"],
    strb: [
        {init: "`", term: "`", esc: ""}
    ]
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }