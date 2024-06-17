/**
* Converts to a signed 32-bit integer.
*/
toInt32(): number;

/**
* Converts to an unsigned 32-bit integer.
*/
toUInt32(): number;

/**
* Converts to a “0x”-prefixed hexadecimal string, unless a `radix`
* is specified.
*/
toString(radix?: number): string;

/**
* Converts to a JSON-serializable value. Same as `toString()`.
*/
toJSON(): string;

/**
* Returns a string containing a `Memory#scan()`-compatible match pattern for this pointer’s raw value.
*/
toMatchPattern(): string;

readPointer(): NativePointer;
readS8(): number;
readU8(): number;
readS16(): number;
readU16(): number;
readS32(): number;
readU32(): number;
readS64(): Int64;
readU64(): UInt64;
readShort(): number;
readUShort(): number;
readInt(): number;
readUInt(): number;
readLong(): number | Int64;
readULong(): number | UInt64;
readFloat(): number;
readDouble(): number;
readByteArray(length: number): ArrayBuffer | null;
readCString(size?: number): string | null;
readUtf8String(size?: number): string | null;
readUtf16String(length?: number): string | null;
