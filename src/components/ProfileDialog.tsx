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

export function ProfileDialog({ trigger }: { trigger?: React.ReactNode }) {
  const { profile, loading, error, updateProfile } = useProfile();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    avatar_url: "",
  });
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  // Once profile loaded, set form
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
        )}
      </DialogContent>
    </Dialog>
  );
}
