export const BalanceStore = {
  getBalance: (): number => {
    if (typeof window === 'undefined') return 50.0;
    const balance = localStorage.getItem('sandbox-balance');
    return balance ? parseFloat(balance) : 50.0;
  },

  setBalance: (amount: number) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sandbox-balance', amount.toString());
    window.dispatchEvent(new CustomEvent('balance-updated'));
  },

  addToBalance: (amount: number) => {
    const currentBalance = BalanceStore.getBalance();
    BalanceStore.setBalance(currentBalance + amount);
  }
};