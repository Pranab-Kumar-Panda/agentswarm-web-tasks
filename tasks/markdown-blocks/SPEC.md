# Parse a strict markdown subset into a block AST

Implement named export `parseBlocks(source)` in markdown_blocks.mjs, Node 22
standard library only. Only edit that file and optional IMPLEMENTATION.md in
this task. No packages, files, network or clock. This medium standalone parser
claims neither CommonMark compliance nor production integration.

Require a primitive string (boxed strings and subclasses raise TypeError).
Reject lone UTF-16 surrogates with RangeError. Replace CRLF pairs with LF;
any remaining CR raises RangeError. Split on LF. A terminal LF terminates the
last physical line; discard that one terminal split element. Empty source has
no blocks. Line numbers are one-based physical lines after normalization.

At top level classify each line, in this exact order: an empty line is blank;
exactly three backticks is a fence; regex ^(#{1,3}) (.+)$ is a heading; regex
^- (.+)$ is a bullet; regex ^> (.+)$ is a quote; everything else is paragraph
text. Regexes use JavaScript semantics without flags. The shown literal space
is one ASCII separator; remove exactly that separator and its marker. Extra
spaces in captured text remain literal. A space-only line is NOT blank. Four
hashes, empty '- ' or '> ', indentation, tabs in place of separators and fence
suffixes are paragraph text. No inline syntax, escapes or nesting is recognized.

Blank lines separate blocks and emit nothing. Each heading emits
{type:'heading',depth:1..3,text:captured,startLine,endLine} on one line.
Consecutive bullet lines form {type:'list',items:[captured strings],startLine,endLine}.
Consecutive quote lines form {type:'quote',text:captures joined by one space,startLine,endLine}.
Consecutive paragraph lines form {type:'paragraph',text:lines joined by one space,startLine,endLine}.
A classification change ends the current block even without a blank line.
An exact fence starts code continuing until the next exact fence; all interior
lines, including blanks and markdown markers, are literal. Emit
{type:'code',text:interior lines joined by LF,startLine,endLine}, whose span
INCLUDES both fences. No ending LF is added to code text. An unclosed fence
raises RangeError. Adjacent fences emit empty code. Inline backticks are literal.

Return exactly {type:'document',children:[blocks]}, with fresh normal objects
and arrays, only listed properties, primitive strings and integer line numbers.
Spans include first through last contributing lines. Preserve source order.
Examples: '' -> {type:'document',children:[]}; '# Hi\nthere' -> document with
heading(depth 1,text 'Hi',lines 1..1) then paragraph(text 'there',lines 2..2).
'- a\n- b\n' -> one list(items ['a','b'],lines 1..2).
'```\nx\n```' -> code(text 'x',lines 1..3). Repeated calls return independent
equal trees and never normalize Unicode or interpret inline punctuation.
All examples are fixtures; checks do not depend on README or changing root files.
