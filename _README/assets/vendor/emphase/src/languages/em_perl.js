var lang = {
    name: "perl",
    fnam: "Perl",
    kwds: [
        "__DATA__",
        "__END__",
        "__FILE__",
        "__LINE__",
        "__PACKAGE__",
        "else",
        "lock",
        "qw",
        "elsif",
        "lt",
        "qx",
        "eq",
        "m",
        "sv",
        "exp",
        "ne",
        "sub",
        "for",
        "no",
        "tr",
        "and",
        "foreach",
        "or",
        "unless",
        "cmp",
        "ge",
        "package",
        "until",
        "continue",
        "gt",
        "q",
        "while",
        "CORE",
        "if",
        "qq",
        "xor",
        "do",
        "le",
        "qr",
        "y",
        "my",
        "return"
    ],
    cmts: "#",
    cmtb: [
        {init: "=pod", term: "=cut"},
        {init: "/*", term: "*/", esc: "*"} // Acme::cmts
    ],
    strl: ["\"", "'"],
    strb: [
        {init: "<<END", term: "END", esc: "<"}
    ],
    lval: [
        "True",
        "False"
    ],
    dcvn: [],
    dcvs: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang); } else { module.exports = lang }