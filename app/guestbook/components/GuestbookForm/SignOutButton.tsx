'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/libs/supabase/server';

interface SignOutButtonProps {}

const SignOutButton = ({}: SignOutButtonProps) => {
  return <Button onClick={() => signOut()}>SignOut</Button>;
};

export default SignOutButton;
