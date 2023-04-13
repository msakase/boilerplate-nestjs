import { User } from 'src/entity/users.entity';

export type ResponseUser = Omit<User, 'passwordHash' | 'createdAt' | 'updatedAt'>;

export const getResponseUser = (user: User): ResponseUser => {
  return {
    id: user.id,
    name: user.name,
  };
};
