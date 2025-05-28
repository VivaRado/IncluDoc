const emphase = require("emphase");

var em = new emphase({headless:true});

var str_bash = `
#!/bin/bash

if [ $a  -eq  true ]
then
  echo "A 'a'"
else
  echo "B 'b'"
fi

function foo(a) {
  local a = 0
  count = a + 1
  echo count
  return
}

# comment

: <<COMMENT
comment line a
true comment line b
COMMENT

: <<x
comment line a
true comment line b
x

: '
comment line a
true comment line b
'
`

var em_html = em.emphasize(str_bash, 'bash');

console.log( em_html.result );

