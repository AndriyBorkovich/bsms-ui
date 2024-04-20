export class ListResponse<TResult> {
    constructor(public result: TResult[], public total: number) {}
}