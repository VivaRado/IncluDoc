var lang = {
    name: "bash",
    fnam: "Bash",
    kwds: [
        "if",
        "then",
        "elif",
        "else",
        "fi",
        "time",
        "for",
        "in",
        "until",
        "while",
        "do",
        "done",
        "case",
        "esac",
        "coproc",
        "select",
        "function",
        "return"
    ],
    func: [
        "command",
        "echo",
        "local"
    ],
    dcvn: [],
    dcvs: [],
    lval: [
        "false",
        "true"
    ],
    cmts: "#",
    cmtb: [
        {init: "(: \<\<|: )('|w+)", term: "(\\n\\2)", esc: "<>w"}
    ],
    strl: ["\"", "'"],
    strb: []
};
if (typeof window !== "undefined") { null==window._em_la_&&(window._em_la_={}),lang.name in Object.keys(window._em_la_)||(window._em_la_[lang.name]=lang);} else {module.exports = lang;}