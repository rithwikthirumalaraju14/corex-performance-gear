
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

export default function ProfileAuthForm({ afterAuth }: { afterAuth?: () => void }) {
  const [tab, setTab] = useState("sign-in");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();
  // Only used in /auth page, not in dialog
  const navigate = useNavigate ? useNavigate() : undefined;

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/",
        data: {
          full_name: fullName,
          phone: phone,
        }
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      })
    } else {
      toast({ title: 'Signed up! Please check your email for confirmation.' });
      afterAuth ? afterAuth() : navigate && navigate('/');
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      })
    } else {
      toast({ title: 'Signed in!' });
      afterAuth ? afterAuth() : navigate && navigate('/');
    }
  };

  return (
    <div>
      <Tabs defaultValue={tab} value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="justify-center mb-4">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="sign-up">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button className="w-full" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
