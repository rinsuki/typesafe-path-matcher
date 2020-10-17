import { Params } from "./params"
import { PathAST } from "./parser"

export function match<AST extends PathAST>(
    ast: AST,
    target: string,
): Params<AST> | undefined {
    var nowTarget = target
    var result: Partial<Params<AST>> = {}
    for (const block of ast) {
        if (typeof block === "string") {
            if (!nowTarget.startsWith(block)) return undefined
            nowTarget = nowTarget.slice(block.length)
        } else {
            const i = nowTarget.indexOf("/")
            const value = i === -1 ? nowTarget : nowTarget.slice(0, i)
            if (value === "") return undefined
            ;(result as Partial<Record<string, string>>)[block.name] = value
            nowTarget = nowTarget.slice(i)
        }
    }
    return result as Params<AST>
}
