import { Account } from "@/app/models/Account";


export const getAccountsFromAPI = (): Account[] => {
  const storedAccounts = localStorage.getItem('accounts');
  return storedAccounts ? JSON.parse(storedAccounts) : [];
};

export const addAccountToAPI = (newAccount: Account): void => {
  const currentAccounts = getAccountsFromAPI();
  const updatedAccounts = [...currentAccounts, newAccount];
  localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
};

export const deleteAccountFromAPI = (index: number): void => {
  const currentAccounts = getAccountsFromAPI();
  const updatedAccounts = currentAccounts.filter((_, i) => i !== index);
  localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
};
