import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/components/ui/use-toast";
import ProfileAuthForm from './ProfileAuthForm';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { useWishlist } from "@/hooks/useWishlist";

export function ProfileDialog({ trigger }: { trigger?: React.ReactNode }) {
  const { profile, loading, error, updateProfile } = useProfile();
  const userId = profile?.id ?? null;
  const { wishlisted, loading: wishlistLoading } = useWishlist(userId);

  // Mockup products list for watchlist display
  const allProducts: any[] = [
    {
      id: 'xt-001',
      name: 'X-Perform Training Tee',
      price: 45.0,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 'cs-002',
      name: 'Core Compression Shorts',
      price: 38.0,
      image: 'https://images.unsplash.com/photo-1506902540976-5005d40e1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 'xb-003',
      name: 'X-Flex Sports Bra',
      price: 42.0,
      image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
    },
    {
      id: 'xj-004',
      name: 'X-Run Performance Joggers',
      price: 65.0,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 'xh-005',
      name: 'X-Core Training Hoodie',
      price: 75.0,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 'xt-006',
      name: 'X-Tank Performance Top',
      price: 35.0,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
  ];

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    avatar_url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Update form state from loaded profile
  React.useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateProfile(form);
    if (ok) {
      toast({ title: "Profile updated" });
      setEditMode(false);
    } else {
      toast({ title: "Error updating profile", description: "Check your data", variant: "destructive" });
    }
  };

  const handleSignOut = async () => {
    await (await import("@/integrations/supabase/client")).supabase.auth.signOut();
    window.location.reload();
  };

  // If error shows we're not logged in
  const isAuthMissing = error === "Not logged in" ||
    error?.toLowerCase().includes("not logged in") ||
    error?.toLowerCase().includes("auth session missing");

  return (
    <Dialog>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarImage src={profile?.avatar_url ?? undefined} />
              <AvatarFallback>
                <User size={20} />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            {profile?.email}
          </DialogDescription>
        </DialogHeader>
        {loading && <div>Loading…</div>}
        {isAuthMissing ? (
          <div className="my-8 text-center">
            <ProfileAuthForm afterAuth={() => window.location.reload()} />
          </div>
        ) : error ? (
          <div className="text-destructive">{error}</div>
        ) : profile && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={form.avatar_url || undefined} />
                    <AvatarFallback>
                      {profile.full_name?.[0]?.toUpperCase() || <User size={28} />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {!editMode ? (
                      <div className="font-medium">{profile.full_name}</div>
                    ) : (
                      <Input
                        value={form.full_name}
                        placeholder="Full Name"
                        onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  {!editMode ? (
                    <div>{profile.phone || <span className="text-muted-foreground">No phone</span>}</div>
                  ) : (
                    <Input
                      type="tel"
                      value={form.phone}
                      placeholder="Phone"
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Avatar URL</label>
                  {!editMode ? (
                    <div>
                      {profile.avatar_url
                        ? <span className="text-xs break-all">{profile.avatar_url}</span>
                        : <span className="text-muted-foreground">No avatar</span>}
                    </div>
                  ) : (
                    <Input
                      type="url"
                      value={form.avatar_url}
                      placeholder="Avatar Image URL"
                      onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))}
                    />
                  )}
                </div>
                <DialogFooter className="flex w-full justify-between items-center">
                  <Button type="button" variant="secondary" onClick={() => setEditMode(!editMode)}>
                    {editMode ? "Cancel" : "Edit"}
                  </Button>
                  {editMode && (
                    <Button type="submit">Save</Button>
                  )}
                  <Button type="button" onClick={handleSignOut} variant="outline">
                    <LogOut className="mr-1" size={16} /> Logout
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>

            <TabsContent value="wishlist">
              <div className="min-h-[120px]">
                <div className="mb-2 font-semibold text-lg">Your Wishlist</div>
                {wishlistLoading ? (
                  <div>Loading wishlist…</div>
                ) : wishlisted && wishlisted.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allProducts
                      .filter(prod => wishlisted.includes(prod.id))
                      .map(prod => (
                        <div key={prod.id} className="flex items-center gap-4 bg-muted rounded-lg p-3">
                          <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-md" />
                          <div>
                            <div className="font-medium">{prod.name}</div>
                            <div className="text-corex-red font-bold">${prod.price}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">No wishlisted products yet!</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="min-h-[120px] flex flex-col items-center justify-center text-muted-foreground">
                <span className="mb-2">Your orders will appear here.</span>
                <span className="text-xs">(Feature coming soon!)</span>
              </div>
            </TabsContent>

            <TabsContent value="address">
              <div className="min-h-[120px] flex flex-col items-center justify-center text-muted-foreground">
                <span className="mb-2">Your address info will appear here.</span>
                <span className="text-xs">(Feature coming soon!)</span>
              </div>
            </TabsContent>

          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
