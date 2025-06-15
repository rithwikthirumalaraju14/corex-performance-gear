
import { useProfile } from "@/contexts/ProfileContext";

export const useWishlist = () => {
  const { profile, toggleWishlist } = useProfile();
  const isInWishlist = (id: string) => !!profile?.wishlist.includes(id);
  return { wishlist: profile?.wishlist ?? [], toggleWishlist, isInWishlist };
};
