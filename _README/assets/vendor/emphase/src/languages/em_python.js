var lang = {
    name: "python",
    fnam: "Python",
    kwds: [
        "await",
        "else",
        //"import",
        "pass",
        "break",
        "except",
        "in",
        "raise",
        "class",
        "finally",
        "is",
        "return",
        "and",
        "continue",
        "for",
        "lambda",
        "try",
        "as",
        "def",
        //"from",
        "nonlocal",
        "while",
        "assert",
        "del",
        "global",
        "not",
        "with",
        "async",
        "elif",
        "if",
        "or",
        "yield"      
    ],
    lval: [
        "False",
        "True",
        "None"
    ],
    dcvn: [],
    dcvs: [
        "import",
        "from"
    ],
    cmts: "#",
    cmtb: [
        {init: "'''", term: "'''", esc: ""},
        {init: "\"\"\"", term: "\"\"\"", esc: ""}
    ],
    strl: ["\"", "'"],
    strb: [
        {init: "'''", term: "'''", esc: "", pre: "=\\s*"},
        {init: "\"\"\"", term: "\"\"\"", esc: "", pre: "=\\s*"}
    ],
    lval: [
        "True",
        "False"
    ]
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }