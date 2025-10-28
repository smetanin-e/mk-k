'use server';

import { userRepository } from '@/entities/user/repository/user-repository';
import { ChangePasswordType } from '../model/schemas/change-password-schema';
import { generateSalt, hashPassword, verifyPassword } from '@/shared/lib/auth/password-utils';

export const changeUserPasswordAction = async (userId: number, formData: ChangePasswordType) => {
  try {
    const user = await userRepository.findUserByIdWithPassword(userId);
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }

    const isValidPassword = await verifyPassword(
      formData.currentPassword,
      user.password,
      user.salt!,
    );
    if (!isValidPassword) {
      return { success: false, message: 'Текущий пароль неверный' };
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(formData.password, salt);

    await userRepository.updatePassword(user.id, hashedPassword, salt);

    return { success: true };
  } catch (error) {
    console.error('[CHANGE_USER_PASSWORD] Server error', error);
    return { success: false, message: 'Ошибка регистрации пользователя' };
  }
};
