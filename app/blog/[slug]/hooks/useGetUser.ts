import useSWR from 'swr';
import { supabaseBrowserClient } from '@/libs/supabase/client';
import { FormatUser, formatUser } from '@/utils/formatUser';

const useGetUser = () => {
  return useSWR<FormatUser>('/user', async () => {
    const { data } = await supabaseBrowserClient.auth.getUser();
    return formatUser(data.user);
  });
};

export default useGetUser;
