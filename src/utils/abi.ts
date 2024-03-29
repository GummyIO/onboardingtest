import Decimal from 'decimal.js';
import { keccak } from 'hash-wasm';
import { Erc20Token } from './contracts/erc20';

// Written according to: https://docs.soliditylang.org/en/v0.8.12/abi-spec.html

/**
 * An interface which could be of a few different types, but with the same structures: inputs and outputs.
 *
 * Every function within a contract is an `Interface`.
 */
export interface Interface {
    name?: string;
    type: InterfaceType;
    inputs: Input[];
    outputs?: Output[];
    stateMutability: StateMutability;
    constant?: boolean;
    payable?: boolean;
}

/** Method input. Also known as a method _parameter_. */
interface Input {
    name: string;
    type: string;
    indexed?: string;
}

/** Method output. Also known as a _return value_. */
interface Output {
    name: string;
    type: string;
}

export enum InterfaceType {
    Function = 'function',
    Constructor = 'constructor',
    /** https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function */
    Fallback = 'fallback',
    /** https://docs.soliditylang.org/en/v0.8.12/contracts.html#receive-ether-function */
    Receive = 'receive',
}

export enum StateMutability {
    /** Won't read blockchain. */
    Pure = 'pure',
    /** Will read but won't modify blockchain. */
    View = 'view',
    /** Will modify blockchain and won't take payment. */
    NonPayable = 'nonpayable',
    /** Will modify blockchain and take payment. */
    Payable = 'payable',
}

/**
 * The signature is defined as the canonical expression of
 * the basic prototype without data location specifier, i.e.
 * the function name with the parenthesised list of parameter types.
 *
 * Parameter types are split by a single comma - no spaces are used.
 */
function methodSignature({ name, inputs }: Interface): string {
    const params = inputs.map((i) => i.type).join(',');
    return `${name}(${params})`;
}

/**
 * Returns the unique id of a method, used when making RPC calls.
 *
 * The method id is the first four bytes of the hashsed method signature.
 */
async function methodId(i: Interface): Promise<string> {
    const sig = methodSignature(i);
    const hash = await keccak(sig, 256);
    const id = hash.slice(0, 8);
    return id;
}

/**
 * Returns the `data` of an Ethereum RPC Call.
 */
export async function callMethod(i: Interface, params?: Hex256[]): Promise<string> {
    const method = await methodId(i);
    if (params) {
        return '0x' + method + params.map((p) => p.value).join('');
    } else {
        return '0x' + method;
    }
}

/**
 * A 256-bit string. This is the data type of every parameter in an RPC call's data field.
 */
type Hex256 = { value: string };

/**
 * Convert any hexadecimal value below 256-bits into a 256-bit
 * hex value without the "0x" qualifier.
 *
 * You'd typically use this when building the data sent during
 * an RPC call.
 */
export function hex256(hex: string | number): Hex256 {
    const HEX_CHARS_PER_256_BITS = 64;
    if (typeof hex === 'number') {
        return { value: hex.toString(16).padStart(HEX_CHARS_PER_256_BITS, '0') };
    }
    if (!hex.startsWith('0x')) {
        throw new Error('hex must start with 0x');
    }
    if (hex.length > HEX_CHARS_PER_256_BITS + 2) {
        throw new Error('hex must not be greater than 256 bits (64 chars)');
    }
    return { value: hex.slice(2).padStart(HEX_CHARS_PER_256_BITS, '0') };
}

/**
 * Format the value of a token as a 256-bit string.
 */
export function token256(token: Erc20Token, decimal: Decimal): Hex256 {
    return hex256(decimal.mul(token.wei).trunc().toHex());
}

