
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Manages the user's wishlisted products, with sync to Supabase.
 * Returns { wishlisted, loading, add, remove, isWishlisted }
 */
export function useWishlist(userId?: string | null) {
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlisted product_ids for this user
  useEffect(() => {
    if (!userId) {
      setWishlisted([]);
      return;
    }
    setLoading(true);
    supabase
      .from("wishlists")
      .select("product_id")
      .eq("user_id", userId)
      .then(({ data }) => {
        setWishlisted(data?.map(row => row.product_id) ?? []);
        setLoading(false);
      });
  }, [userId]);

  // Adds a product id to wishlist
  const add = async (productId: string) => {
    if (!userId) return;
    setLoading(true);
    await supabase.from('wishlists').insert({ user_id: userId, product_id: productId });
    setWishlisted(wl => [...wl, productId]);
    setLoading(false);
  };

  // Removes a product id from wishlist
  const remove = async (productId: string) => {
    if (!userId) return;
    setLoading(true);
    await supabase.from('wishlists')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    setWishlisted(wl => wl.filter(id => id !== productId));
    setLoading(false);
  };

  // Checks if a product id is in the wishlisted array
  const isWishlisted = (productId: string) => wishlisted.includes(productId);

  return { wishlisted, loading, add, remove, isWishlisted };
}
