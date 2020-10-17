import { PathASTPart, PathASTPartParam } from "./parser"

type Param<
    ASTPart extends PathASTPart<string>
> = ASTPart extends PathASTPartParam<infer U> ? Record<U, string> : {}

type ExtendsOrNever<T, U> = T extends U ? T : never

export type Params<AST extends PathASTPart[]> =
    AST extends []
        ? {}
        : AST extends readonly [infer I1, ...infer I2]
            ? Param<ExtendsOrNever<I1, PathASTPart>> &
                Params<ExtendsOrNever<I2, PathASTPart[]>>
            : {}
