import { shortestSplitter } from "./utils/shortestSplitter"

export type PathASTPartParam<T extends string> = {type: "param", name: T}
export type PathASTPart<T extends string = string> = PathASTPartParam<T> | T

export type PathASTComputed<Path extends string> =
    Path extends ""
        ? []
        : Path extends `${infer P}/${infer C}`
            ? [...PathASTComputed<P>, "/", ...PathASTComputed<C>]
            : Path extends `${infer Before}:${infer P}`
                ? [...PathASTComputed<Before>, {type: "param", name: P}]
                : [Path]

export type PathAST = (string | PathASTPart)[]

export function parser<T extends string>(path: T): PathASTComputed<T> {
    if (path === "") {
        return [] as PathASTComputed<T>
    }
    const pathSplit = shortestSplitter(path, "/")
    if (pathSplit != null) {
        return [
            ...parser(pathSplit[0]),
            "/",
            ...parser(pathSplit[1]),
        ] as unknown as PathASTComputed<T>
    }
    const paramSplit = shortestSplitter(path, ":")
    if (paramSplit != null) {
        return [
            ...parser(paramSplit[0]),
            {
                type: "param",
                name: paramSplit[1]
            }
        ] as unknown as PathASTComputed<T>
    }
    return [path] as PathASTComputed<T>
}
