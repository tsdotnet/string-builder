/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT
 */
export default class StringBuilder {
    private readonly _partArray;
    private _latest;
    constructor(...initial: any[]);
    newLine: string;
    setNewLine(newLine: string): this;
    appendSingle(item: unknown): this;
    appendThese(items: any[]): this;
    append(...items: any[]): this;
    appendLine(...items: any[]): this;
    appendLines(items: any[]): this;
    get isEmpty(): boolean;
    toString(): string;
    join(delimiter: string): string;
    clear(): void;
    dispose(): void;
}
