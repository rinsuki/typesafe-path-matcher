export type ShortestSplitter<Input extends string, Splitter extends string> =
    Splitter extends "" ? ["", Input] :
    Input extends `${infer O1}${Splitter}${infer O2}` ? [O1, O2] :
    string extends Input ? [string, string] | undefined :
    undefined

export function shortestSplitter<Input extends string, Splitter extends string>(input: Input, splitter: Splitter): ShortestSplitter<Input, Splitter> {
    const index = input.indexOf(splitter)
    if (index >= 0) {
        return [input.slice(0, index), input.slice(index + splitter.length)] as const as ShortestSplitter<Input, Splitter> 
    } else {
        return undefined as ShortestSplitter<Input, Splitter> 
    }
}