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

const apiUrl = 'https://altoqueperuwk.com/wp-admin/admin-ajax.php';

export const getMessageFromAPI = async (): Promise<string> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      action: 'altoke_get_user_data',
    }),
  });
  
  return response.text();
};
export const sendMessageFromAPI = async (): Promise<string> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      action: 'altoke_return_data',
      data: 'test',
    }),
  });
  
  return response.text();
};

