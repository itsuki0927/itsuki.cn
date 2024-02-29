import GithubAuthIcon from '../GithubAuthIcon';
import GoogleAuthIcon from '../GoogleAuthIcon';
import GuestbookSenderForm from './GuestbookSenderForm';
import { createSupabaseServerClient } from '@/libs/supabase/server';

const GuestbookForm = async () => {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

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
