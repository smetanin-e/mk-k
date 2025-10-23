import { getUserSession } from '@/features/auth/actions/get-user-session';
import { Header } from '@/shared/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { UserList } from '@/widgets/users/ui/user-list';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const user = await getUserSession();
  if (!user) return redirect('/');
  if (user.role !== UserRole.ADMIN) return redirect('/replacement');

  return (
    <div className='container mx-auto py-4 px-2'>
      <Header
        title='Администрирование'
        description='Управление пользователями и их ролями'
        user={user}
      />
      <Card>
        <CardHeader className='flex items-center justify-between'>
          <CardTitle>Список пользователей</CardTitle>
          {/* <AddUser /> */}
        </CardHeader>
        <CardContent>
          {' '}
          <UserList admin={user} />
        </CardContent>
      </Card>
    </div>
  );
}
