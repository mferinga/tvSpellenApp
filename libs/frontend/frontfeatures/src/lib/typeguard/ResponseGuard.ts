export function hasRestults(obj: unknown): obj is IResponse {
    return(obj as IResponse)?.results !== undefined
        && typeof(obj as IResponse).results === "object";
}

export function hasInfo(obj: unknown): obj is IResponse {
    return(obj as IResponse)?.info !== undefined
        && typeof(obj as IResponse).info === "object";
}