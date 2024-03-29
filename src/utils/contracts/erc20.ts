import { Decimal } from 'decimal.js';
import { hex256, Interface, InterfaceType, callMethod, StateMutability, token256 } from '../abi';
import { Chain } from '../chain';
import { call, ProviderRpcError, sendTransaction, TokenAddress, WalletProvider } from '../providerEip1193';
import { ok, Result } from '../util';

export interface Erc20Token {
    name: string;
    symbol: string;
    logo: any;
    address: TokenAddress;
    chain: number;

    coingecko?: string;

    /**
     * The number of decimal places this token can represent.
     * Otherwise known as _precision_.
     *
     * Most tokens are 18 decimals, some are not.
     *
     * Don't use this property for converting to/from wei. Use {@link wei} for that.
     */
    decimals: number;

    /**
     * The amount of wei in a single token. You should use this
     * when converting to/from values used by the blockchain!
     * ```ts
     * balance.mul(token.wei); // From tokens to wei
     * balance.div(token.wei); // From wei to tokens
     * ```
     */
    wei: Decimal;
}

export interface LpToken extends Erc20Token {
    reserveAddress: TokenAddress;
    lpURL: string;
    isFour: boolean;
}

export async function allowance(
    chain: Chain,
    token: Erc20Token,
    owner: string,
    spender: string,
): Promise<Result<Decimal, ProviderRpcError>> {
    const ABI: Interface = {
        name: 'allowance',
        type: InterfaceType.Function,
        stateMutability: StateMutability.View,
        inputs: [
            { name: '_owner', type: 'address' },
            { name: '_spender', type: 'address' },
        ],
        outputs: [{ name: '', type: 'uint256' }],
    };
    const result = await call(chain, {
        to: token.address,
        data: await callMethod(ABI, [hex256(owner), hex256(spender)]),
    });
    if (!result.isOk) {
        return result;
    }
    const allowance = new Decimal(result.value).mul(token.wei);
    return ok(allowance);
}

export async function approve(
    provider: WalletProvider,
    token: Erc20Token,
    owner: string,
    spender: string,
    allowance: Decimal,
): Promise<Result<boolean, ProviderRpcError>> {
    const ABI = {
        name: 'approve',
        type: InterfaceType.Function,
        stateMutability: StateMutability.NonPayable,
        inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    };
    const result = await sendTransaction(provider, {
        from: owner,
        to: token.address,
        data: await callMethod(ABI, [hex256(spender), token256(token, allowance)]),
    });
    if (!result.isOk) {
        return result;
    }
    const isSuccess = parseInt(result.value) === 1;
    return ok(isSuccess);
}

export async function balanceOf(
    chain: Chain,
    token: Erc20Token,
    owner: string,
): Promise<Result<Decimal, ProviderRpcError>> {
    const ABI: Interface = {
        name: 'balanceOf',
        type: InterfaceType.Function,
        stateMutability: StateMutability.View,
        inputs: [{ name: '_owner', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }],
    };
    const result = await call(chain, {
        to: token.address,
        data: await callMethod(ABI, [hex256(owner)]),
    });

    if (!result.isOk) {
        return result;
    }
    const balance = new Decimal(result.value).div(token.wei);
    return ok(balance);
}

export async function getTotalSupply(chain: Chain, token: Erc20Token): Promise<Result<Decimal, ProviderRpcError>> {
    const ABI: Interface = {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: StateMutability.View,
        type: InterfaceType.Function,
    };
    const result = await call(chain, {
        to: token.address,
        data: await callMethod(ABI),
    });
    if (!result.isOk) {
        return result;
    }
    return ok(new Decimal(result.value).div(token.wei));
}
