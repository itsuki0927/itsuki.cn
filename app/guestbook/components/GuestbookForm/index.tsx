import { auth } from '@/libs/auth';
import GithubAuthIcon from '../GithubAuthIcon';
import GoogleAuthIcon from '../GoogleAuthIcon';
import GuestbookSenderForm from './GuestbookSenderForm';

const GuestbookForm = async () => {
  const session = await auth();

  if (session) {
    return <GuestbookSenderForm />;
  }

  return (
    <div className="flex space-x-2">
      <GithubAuthIcon />
      <GoogleAuthIcon />
    </div>
  );
};

export default GuestbookForm;
