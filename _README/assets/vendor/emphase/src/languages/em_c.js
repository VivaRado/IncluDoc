var lang = {
    name: "c",
    fnam: "C",
    kwds: [
        "auto",
        "break",
        "case",
        "char",
        "const",
        "continue",
        "default",
        "do",
        "double",
        "else",
        "enum",
        "extern",
        "float",
        "for",
        "goto",
        "if",
        "int",
        "long",
        "register",
        "return",
        "short",
        "signed",
        "sizeof",
        "static",
        "struct",
        "switch",
        "typedef",
        "union",
        "unsigned",
        "void",
        "volatile",
        "while"
    ],
    func: [
        "printf"
    ],
    dcvn: [
        "#define",
        "#undef",
        "#if",
        "#ifdef",
        "#ifndef",
        "#else",
        "#elseif",
        "#elif",
        "#endif",
        "#error",
    ],
    dcvs: [
        "#include"
    ],
    cmts: "//",
    cmtb: [
        {init: "/*", term: "*/", esc: "*"}
    ],
    strl: ["\"", "'"],
    lval: [
        "TRUE",
        "FALSE"
    ],
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }