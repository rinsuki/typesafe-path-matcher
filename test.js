const { parser, match } = require(".")
const assert = require("assert")

// exact match
assert.deepStrictEqual(match(parser("/"), "/"), {})
assert.deepStrictEqual(match(parser("/:user"), "/"), undefined)
assert.deepStrictEqual(match(parser("/:user"), "/hoge"), {user: "hoge"})
assert.deepStrictEqual(match(parser("/:p1:p2"), "/hoge"), {"p1:p2": "hoge"})
assert.deepStrictEqual(match(parser("/@:user/posts/:id"), "/@user/posts/1"), {user: "user", id: "1"})

// not exact match
assert.deepStrictEqual(match(parser("/"), "/", false), {})
assert.deepStrictEqual(match(parser("/"), "/test", false), {})
assert.deepStrictEqual(match(parser("/:user"), "/", false), undefined)
assert.deepStrictEqual(match(parser("/:user"), "/hoge", false), {user: "hoge"})
assert.deepStrictEqual(match(parser("/:user"), "/hoge/fuga", false), {user: "hoge"})
