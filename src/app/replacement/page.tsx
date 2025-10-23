import { getUserSession } from '@/features/auth/actions/get-user-session';
import { Header } from '@/shared/components/header';
import { redirect } from 'next/navigation';

export default async function Replacement() {
  const user = await getUserSession();
  if (!user) return redirect('/');

  return (
    <div className='container mx-auto py-4 px-2'>
      <Header
        title='Замена картриджа'
        description='Оформление замены картриджа, статистика'
        user={user}
      />
      {/* Статистика */}
    </div>
  );
}
