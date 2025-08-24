export type WishlistItem = {
  id: number;
  name: string;
  amount: number;
  photo: string;
  dateAdded: string;
};

export const WishlistStore = {
  getWishlist: (): WishlistItem[] => {
    if (typeof window === 'undefined') return [];
    const wishlist = localStorage.getItem('sandbox-wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  },

  saveWishlist: (wishlist: WishlistItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sandbox-wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  },

  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'dateAdded'>) => {
    const wishlist = WishlistStore.getWishlist();
    const newItem: WishlistItem = {
      ...item,
      id: Date.now(),
      dateAdded: new Date().toISOString().split('T')[0]
    };
    WishlistStore.saveWishlist([newItem, ...wishlist]);
  }
};