(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.stringBuilder = global.tsdotnet.stringBuilder || {})));
})(this, (function (exports) { 'use strict';

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
            if (items?.length)
                this.appendLines(items);
            else
                this._partArray.push(this.newLine);
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

    exports.default = StringBuilder;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=string-builder.js.map
