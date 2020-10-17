import { Params } from "./params"
import { PathASTComputed } from "./parser"

export { match } from "./match"
export { parser } from "./parser"
export type ParamsFromPath<Path extends string> = Params<PathASTComputed<Path>>