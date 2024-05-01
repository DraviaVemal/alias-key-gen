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


    public next() {
        const r: any[] = [];
        for (const char of this._nextId) {
            r.unshift(this._chars[char]);
        }
        if (this._numSeq && this._suffixNum >= 0) {
            r.push(this._suffixNum);
        }
        this._increment();
        const temp = r.join('');
        return temp;
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