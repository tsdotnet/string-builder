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
/* eslint-disable @typescript-eslint/no-explicit-any */
const EMPTY = '';
export default class StringBuilder {
    constructor(...initial) {
        this.newLine = '\n';
        this._latest = null;
        this._partArray = [];
        this.appendThese(initial);
    }
    setNewLine(newLine) {
        if (newLine == null)
            throw new Error('\'newLine\' cannot be null or undefined.');
        this.newLine = newLine;
        return this;
    }
    appendSingle(item) {
        if (item != null) {
            this._latest = null;
            switch (typeof item) {
                case 'object':
                case 'function':
                    item = item.toString();
                    break;
            }
            this._partArray.push(item); // Other primitive types can keep their format since a number or boolean is a smaller footprint than a string.
        }
        return this;
    }
    appendThese(items) {
        for (const s of items)
            this.appendSingle(s);
        return this;
    }
    append(...items) {
        this.appendThese(items);
        return this;
    }
    appendLine(...items) {
        this.appendLines(items);
        return this;
    }
    appendLines(items) {
        items.forEach((i) => {
            if (i != null) {
                this.appendSingle(i);
                this._partArray.push(this.newLine);
            }
        });
        return this;
    }
    get isEmpty() {
        return this._partArray.length === 0;
    }
    toString() {
        let latest = this._latest;
        if (latest == null)
            this._latest = latest = this._partArray.join(EMPTY);
        return latest;
    }
    join(delimiter) {
        return this._partArray.join(delimiter);
    }
    clear() {
        this._partArray.length = 0;
        this._latest = null;
    }
    dispose() {
        this.clear();
    }
}
//# sourceMappingURL=StringBuilder.js.map