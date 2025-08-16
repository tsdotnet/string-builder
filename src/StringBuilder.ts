/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT
 */

/*****************************
 * IMPORTANT NOTES ABOUT PERFORMANCE:
 * http://jsperf.com/string-concatenation-looped
 * http://jsperf.com/adding-strings-to-an-array
 * http://jsperf.com/string-concatenation-versus-array-operations-with-join
 *
 * It is clearly inefficient to use a StringBuilder or LinkedList to build a string when you have a small set of string portions.
 * StringBuilder will really show it's benefit likely somewhere above 1000 items.
 *****************************/

 

const EMPTY = '';

export default class StringBuilder
{
	//noinspection JSMismatchedCollectionQueryUpdate
	private readonly _partArray: any[];
	private _latest: string | null; // AKA persistentString

	constructor(...initial: any[]) {
		this._latest = null;
		this._partArray = [];
		this.appendThese(initial);
	}

	newLine: string = '\n';

	setNewLine (newLine: string): this
	{
		if(newLine==null) throw new Error('\'newLine\' cannot be null or undefined.');
		this.newLine = newLine;
		return this;
	}

	appendSingle (item: unknown): this
	{
		if(item!=null)
		{
			this._latest = null;
			switch(typeof item)
			{
				case 'object':
				case 'function':
					item = (item as any).toString();
					break;
			}
			this._partArray.push(item); // Other primitive types can keep their format since a number or boolean is a smaller footprint than a string.
		}
		return this;
	}

	appendThese(items: any[]): this {
		for(const s of items) this.appendSingle(s);
		return this;
	}

	append(...items: any[]): this {
		this.appendThese(items);
		return this;
	}

	appendLine(...items: any[]): this {
		this.appendLines(items);
		return this;
	}

	appendLines(items: any[]): this {
		items.forEach((i) => {
			if (i != null) {
				this.appendSingle(i);
				this._partArray.push(this.newLine);
			}
		});
		return this;
	}

	get isEmpty(): boolean {
		return this._partArray.length === 0;
	}

	toString(): string {
		let latest = this._latest;
		if (latest == null)
			this._latest = latest = this._partArray.join(EMPTY);
		return latest;
	}

	join(delimiter: string): string {
		return this._partArray.join(delimiter);
	}

	clear(): void {
		this._partArray.length = 0;
		this._latest = null;
	}

	dispose(): void {
		this.clear();
	}
}
