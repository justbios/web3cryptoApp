import {selector} from "recoil";
import {accountAtom} from "./atom";
import di, {DI_TOKENS} from "../../di";
import {IAccountManagement} from "../../features/account_management/account_management_interface";

export const getBalanceSelector = selector({
    key: 'getBalance',
    get: async ({get}) => {
        const {address} = get(accountAtom);

        const accountManager = di.get<IAccountManagement>(DI_TOKENS.AccountManager);

        return accountManager.getAccountBalance(address);
    }
})
