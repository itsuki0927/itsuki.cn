import { supabaseBrowserClient } from '@/libs/supabase/client';
import GithubAuthIcon from '../GithubAuthIcon';
import GoogleAuthIcon from '../GoogleAuthIcon';
import GuestbookSenderForm from './GuestbookSenderForm';

const GuestbookForm = async () => {
  const supabase = supabaseBrowserClient;
  const { data, error } = await supabase.auth.getUser();

  console.log('data:', data, error);

  if (data.user) {
    return (
      <>
        <GuestbookSenderForm />
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
