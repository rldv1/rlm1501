let module = Process.findModuleByName("librlm1501.jnilib");
let base = module.base;

let numextra = 0x13; //__data:0000000000098004 _numextra or just extra.length
var extra = [
    "ad2",
    "unnxc",
    "iwve",
    "1",
    "jvev",
    "wwverff",
    "A",
    "vevexx",
    "xx",
    "khy",
    "act",
    "82d",
    "kv3ve",
    "xxc8y",
    "8",
    "99",
    "xxxvd",
    "rlm",
    "act"
];
var encodeTable = "0123456789abcdefghjkmnpqrstuvwxyoizABCDEFGHIJKLMNPQRSTUVWXYZ+=*~w";
let keyk = [0x30, 0x81, 0xF8, 0x02, 0x01, 0x00, 0x02, 0x41, 0x00, 0xAF, 0xC4, 0x55, 0x58, 0x2F, 0x90, 0x2F, 0x85, 0xB1, 0xE1, 0xB0, 0xB9, 0x67, 0xAB, 0x0D, 0xDC, 0x05, 0x1C, 0x02, 0xDD, 0xF1, 0x98, 0xEC, 0x84, 0xE0, 0x33, 0xDD, 0xE9, 0x60, 0xD4, 0x73, 0xF3, 0x07, 0x85, 0xE3, 0xA1, 0x46, 0x2B, 0x58, 0x7E, 0xC6, 0x96, 0x18, 0xC4, 0x81, 0xBC, 0x5B, 0x44, 0x02, 0xC7, 0x2A, 0x1D, 0x5A, 0xDE, 0x49, 0xCB, 0xB9, 0xFD, 0xA2, 0xBF, 0x07, 0xA6, 0xCC, 0x67, 0x02, 0x15, 0x00, 0xA3, 0xD1, 0x40, 0x52, 0x05, 0x68, 0x24, 0x6F, 0x96, 0x30, 0x35, 0x0C, 0xCE, 0xE1, 0xB3, 0x6C, 0x0E, 0x37, 0x50, 0x87, 0x02, 0x40, 0x61, 0x5C, 0x19, 0x5E, 0xC8, 0x31, 0x34, 0x29, 0x97, 0x7D, 0x6F, 0x0C, 0xCC, 0xBB, 0x17, 0x9F, 0xFF, 0x04, 0x70, 0xDD, 0xDE, 0x1C, 0x4A, 0x9F, 0x4B, 0xD0, 0x1F, 0xFC, 0x6A, 0xBC, 0x1E, 0x61, 0x96, 0xB9, 0xC5, 0x17, 0xC5, 0x16, 0xC9, 0x66, 0x9A, 0x5D, 0x7C, 0xDF, 0xA3, 0xFE, 0x9E, 0x5E, 0x07, 0x7B, 0x57, 0x61, 0xDA, 0x65, 0x82, 0xD0, 0xA8, 0x04, 0xB4, 0xD1, 0xDA, 0xC0, 0x15, 0x30, 0x02, 0x41, 0x00, 0x9E, 0x66, 0x38, 0xBB, 0xE6, 0x76, 0x6B, 0x67, 0xA3, 0x70, 0xAD, 0x0E, 0xBB, 0x18, 0x72, 0x9E, 0x91, 0x2B, 0x51, 0x4C, 0xCD, 0x4C, 0x2B, 0x74, 0x2D, 0xDF, 0x3D, 0x8F, 0xD0, 0x3A, 0xE8, 0x81, 0xDB, 0x30, 0xC6, 0x8B, 0x39, 0x7B, 0xA5, 0xB9, 0x92, 0x94, 0xE0, 0xD6, 0x4E, 0xFC, 0x07, 0xFF, 0x33, 0x48, 0xD1, 0x22, 0xBB, 0x37, 0x41, 0xCD, 0x00, 0xE6, 0x0C, 0x93, 0x5E, 0xF9, 0xF7, 0xB4, 0x02, 0x14, 0x3C, 0x36, 0x3A, 0x9A, 0xDB, 0x98, 0xEF, 0x28, 0xBD, 0x84, 0x2A, 0x56, 0x5F, 0xD7, 0x61, 0x2C, 0xBF, 0xB2, 0x6B, 0x7F, 0x30]

function allocArray(array) {
    var size = array.length; //size
    var ptr = Memory.alloc(size);
    for (var i = 0; i < size; i++) Memory.writeU8(ptr.add(i), array[i]);
    return ptr;
}

function _rlm_getrepk(a1) {
    let a2 = Memory.alloc(512);
    a2.writeByteArray(keyk)
    return a2;
}
var byteMasks = [1, 3, 7, 0xF, 0x1F, 0x3F, 0x7F, 0xFF];

function getbits(a1, a2, a3) {
    /*
     __int64 __fastcall getbits(int a1, int a2, unsigned __int8 a3)
     {
       return (unsigned __int8)(((int)a3 >> a2) & byteMasks[a1 - a2]);
     }
     */
    var mask = (a3 >> a2) & byteMasks[a1 - a2];
    console.log("gbits:", a1, a2, a3, mask)
    return mask;
}

function _rlm_encode_sig(a1, a2, a3, a4, a5) {
    let v10 = 0;
    let v9 = 0;
    let v8 = 0;
    
    if (a1 < 4 || a1 > 6) {
        return -1;
    }

    let v15 = 7;
    var v7 = 0;
    for (let i = 8 - a1;; i = v7) {
        let v17 = v15 - i + 1;
        let v16 = a1 - v17;
        let v11 = getbits(v15, i, Memory.readU8(a2.add(v9)));
        let v12;
        var v13 = 0;
        

        if (v17 === a1) {
            v12 = v11;
        } else {
            if (v17 >= a1) {
                console.log("INVALID RANGE!")
                return -1;
            }
            
            if (v9 + 1 < a3) {
                v13 = 8 - v16;
                v12 = (v11 << v16) | getbits(7, 8 - v16, Memory.readU8(a2.add(v9 + 1)));
            } else {
                v12 = v11 << v16;
            }
        }

        Memory.writeU8(a4.add(v8++), encodeTable[v12].charCodeAt(0));

        // end...
        if (v8 >= a5) break;

        // никита ты зачем в эту компанию програмистом устроился
        if (i) {
            v15 = (v17 === a1) ? i - 1 : v13 - 1;
        } else {
            if (++v9 >= a3) {
                break;
            }
            v15 = (v17 === a1) ? 7 : v13 - 1;
        }

        v7 = (v15 - a1 + 1) < 0 ? 0 : v15 - a1 + 1;
    }

    //final for utf8
    Memory.writeU8(a4.add(v8), 0);
    return v10;
}




//there is not seedrandom in Math, soo..
function LCG(seed) {
    this.seed = seed;
    this.modulus = 0x100000000;
    this.a = 1664525;
    this.c = 1013904223;
    this.next = function() {
        this.seed = (this.a * this.seed + this.c) % this.modulus;
        return this.seed;
    };
    this.rand = function(max) {
        return Math.floor(this.next() / this.modulus * max);
    };
}

function strcat(dest, src) {
    return dest + src;
}

function _encrypt(a1, a2, a3) {
    
    let v11 = a1;
    let v10 = a2;
    let v9 = a3;
    let v6 = 0;
    let v8 = 251;
    let v4 = _rlm_getrepk();
    let v7 = v11.readUtf8String().length;
    let v7_1 = v11.readUtf8String().length;
    
    for (let i = 0; i < v7_1; i++) {
        if (v7 >= v8) v7 = 0;
        
        let x = v11.add(i).readU8() ^ v4.add(v7).readU8();
        v11.add(i).writeU8(x) //unk
        v6++;
        v7++;

    }
    _rlm_encode_sig(6, v11, v6, v10, v9)
    //new NativeFunction(base.add(0x10B8C), "pointer", ["long", "pointer", "int", "pointer", "int"])(6, v11, v6, v10, v9);
    return v11
}

//UNVERIFIED
function makejunk(result, a2, a3) {
    let v5 = result;
    v5[0] = '';
    while (a3 > 0) {
        v5 = strcat(v5, extra[a2]);
        v5 = strcat(v5, "=");
        v5 = strcat(v5, extra[(a2 + 3) % numextra]);
        v5 = strcat(v5, "&");
        a2 = (a2 + 5) % numextra;
        --a3;
    }
    console.log("makejunk", v5)
    return v5;
}
//let _encrypt = new NativeFunction(base.add(0xCCC8), 'pointer', ['pointer', 'pointer', 'int']);

function xormeow(data, key) {
    let result = '';
    for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}
function meow(data) {
    var output = Memory.alloc(9998);
    _encrypt(Memory.allocUtf8String(data), output, 9998);
    console.log(Memory.readByteArray(output, 256))
    return output.readUtf8String();
}


function miau() {
    let v95 = new Array(128).fill(0);
    let v96 = new Array(128).fill(0);
    let v102 = new Array(512).fill(0);
    let v105 = new Array(512).fill(0);
    let v106 = new Array(512).fill(0);
    let v100 = new Array(512).fill(0);

    let v58 = Math.floor(Date.now() / 1000);
    let lcg = new LCG(v58 & 0xFFF);

    for (let i = 0; i < 4; i++) {
            v95[4 * i + 66] = lcg.rand(numextra);
            v95[4 * i + 50] = lcg.rand(2) + 1;
            v96.splice(25 * i, 25, ...makejunk(v96, v95[4 * i + 66], v95[4 * i + 50], lcg));
    }

    let v54 = lcg.rand(3);

    let str = "api=y&count=1&log=1&akey=CEET-2394-1764-7864-2860&hostname=tokyo&cmd=getinfo&hostid=9cd23b8c uuid=24006B9C-E300-0000-0000-000000000000 disksn=00523_48_51314F_4F.E 00410e3aa0c5 00155d5171c6 02410e3a80e5 02410e3a90f5 005056c00001 005056c00008 00410e3aa0c6 ip=172.29.240.1 ip=192.168.226.1 ip=192.168.111.1 &extra=&time=66e48bbf"

    let encrypted_data = meow(str);
    return encrypted_data;
}



Interceptor.attach(base.add(0x8F28), {
    onEnter(args) {
        console.log("E:" + miau())
    }
})
