export class AliasKeyGen {
    private _chars: string;
    private _nextId: number[];
    private _suffixNum: number = -1;
    private _numSeq = false;
    private _maxNumSeq: number = 9;

    /**
     * Create a object that maintains the sequence within object lifecycle 
     * @param enableNumSeq Enable number suffix in the sequence generator 
     * @param startSequence Enable number suffix in the sequence generator 
     * @param chars user char list. Be careful on update to avoid keyword trigger 
     */
    constructor({ startSequence, charString, extendNumberSequenceSuffix }: {
        startSequence?: string,
        charString?: string,
        extendNumberSequenceSuffix?: {
            enableNumSeq?: boolean,
            maxNumberSeq?: number
        }
    } = {
            startSequence: 'a', charString: 'abcdfghjkmpqxz', extendNumberSequenceSuffix: {
                enableNumSeq: true,
                maxNumberSeq: 9
            }
        }) {
        const sequenceChars = (startSequence ?? 'a').split('');
        this._chars = charString ?? 'abcdfghjkmpqxz';
        this._numSeq = extendNumberSequenceSuffix?.enableNumSeq ?? false;
        this._maxNumSeq = extendNumberSequenceSuffix?.maxNumberSeq ?? 9;
        this._nextId = (sequenceChars.map(char => {
            if (isNaN(+char)) {
                return this._chars.indexOf(char) !== -1 ? this._chars.indexOf(char) : 0
            } else {
                this._suffixNum = +char;
                return null;
            }
        }).filter(v => v != null) as number[]).reverse();
    }
    /**
     * Static Method for quick use to generate next id
     */
    public static getNextId(currentId: string, options?: {
        charString?: string,
        extendNumberSequenceSuffix?: {
            enableNumSeq?: boolean,
            maxNumberSeq?: number
        }
    }): string {
        var _suffixNum: number = -1;
        const _chars = options?.charString ?? 'abcdfghjkmpqxz';
        const _numSeq = options?.extendNumberSequenceSuffix?.enableNumSeq ?? false;
        const _maxNumSeq = options?.extendNumberSequenceSuffix?.maxNumberSeq ?? 9;
        const _nextId = (currentId.split('').map(char => {
            if (isNaN(+char)) {
                return _chars.indexOf(char) !== -1 ? _chars.indexOf(char) : 0
            } else {
                _suffixNum = +char;
                return null;
            }
        }).filter(v => v != null) as number[]).reverse();
        for (let i = 0; i < _nextId.length; i++) {
            let val = 0;
            if (_numSeq && _suffixNum < _maxNumSeq) {
                val = _nextId[i];
                ++_suffixNum;
            } else {
                val = ++_nextId[i];
                _suffixNum = -1;
            }
            if (val >= _chars.length) {
                _nextId[i] = 0;
                _suffixNum = 9;
            }
        }
        _nextId.push(0);
        const result: any[] = [];
        for (const char of _nextId) {
            result.unshift(_chars[char]);
        }
        if (_numSeq && _suffixNum >= 0) {
            result.push(_suffixNum);
        }
        return result.join('');
    }
    /**
     * Use this when you want to maintain the sequence order within an object.
     * If you want to generate next id based on differenct reference. use static method 'getNextId'
     * @returns Returns next sequence id
     */
    public next() {
        const result: any[] = [];
        for (const char of this._nextId) {
            result.unshift(this._chars[char]);
        }
        if (this._numSeq && this._suffixNum >= 0) {
            result.push(this._suffixNum);
        }
        this._increment();
        return result.join('');
    }

    private _increment() {
        for (let i = 0; i < this._nextId.length; i++) {
            let val = 0;
            if (this._numSeq && this._suffixNum < this._maxNumSeq) {
                val = this._nextId[i];
                ++this._suffixNum;
            } else {
                val = ++this._nextId[i];
                this._suffixNum = -1;
            }
            if (val >= this._chars.length) {
                this._nextId[i] = 0;
                this._suffixNum = 9;
            } else {
                return;
            }
        }
        this._nextId.push(0);
        this._suffixNum = -1;
    }

    *[Symbol.iterator]() {
        while (true) {
            yield this.next();
        }
    }
}