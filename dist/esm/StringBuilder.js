/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT
 */
const EMPTY = '';
class StringBuilder {
    _partArray;
    _latest;
    constructor(...initial) {
        this._latest = null;
        this._partArray = [];
        this.appendThese(initial);
    }
    newLine = '\n';
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
            this._partArray.push(item);
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

export { StringBuilder as default };
//# sourceMappingURL=StringBuilder.js.map
