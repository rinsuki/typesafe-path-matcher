# typesafe-path-matcher

type-safe path matcher. requires `typescript>4.1` (currently `typescript@beta`)

## How to use

```typescript
import { parser, match } from "typesafe-path-matcher"

const pathAST = parser("/@:user/posts/:post")

const result = match(pathAST, "/@user/posts/111")
if (result != null) {
    const userName = result.user
    const postID = result.post
    // const unk = result.hogehoge // it becomes compile-time error
}
```

## LICENSE

MIT