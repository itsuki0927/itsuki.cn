import GithubAuthIcon from '../GithubAuthIcon';
import GoogleAuthIcon from '../GoogleAuthIcon';
import GuestbookSenderForm from './GuestbookSenderForm';
import { createSupabaseServerClient } from '@/libs/supabase/server';
import SignOutButton from './SignOutButton';
import { ENV } from '@/constants/env';

const GuestbookForm = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return (
      <>
        <GuestbookSenderForm />
        {ENV.isDev || ENV.isPreview ? <SignOutButton /> : null}
      </>
    );
  }

  return (
    <div className="flex space-x-2">
      <GithubAuthIcon />
      <GoogleAuthIcon />
    </div>
  );
};

export default GuestbookForm;
