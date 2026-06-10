import { UserDAO } from '../dao/user.dao'
import { UserCreateDTO, UserUpdateDTO, UserSearchAllDTO, UserSearchByIdDTO } from '../dto/user.dto'
import { User } from '../model/user'
import { PasswordCrypto } from './passwordCrypto';

export class UserService {
    public constructor (private readonly userDAO: UserDAO) {}

    public async create(userCreateDTO: UserCreateDTO){
        try{
            userCreateDTO.password = await PasswordCrypto.hashPassword(userCreateDTO.password);
            const user = User.construct(userCreateDTO);

            await this.userDAO.create(user)
        }catch (error){
            throw error
        }
    }

    public async searchAll(): Promise<UserSearchAllDTO[] | null> {
        const userDTO: UserSearchAllDTO[] | null = await this.userDAO.searchAll()
        if (userDTO) {
            return userDTO
        }
        return null
    }

    public async searchById(id: string): Promise <UserSearchByIdDTO[] | null>{
        const userDTO: UserSearchByIdDTO[] | null = await this.userDAO.searchById(id)
        if (userDTO) {
            return userDTO
        }
        return userDTO
    }

    public async update(id: string, userUpdateDTO: UserUpdateDTO) {// atualiza todos os dados mesmo os não alterados
        try {
            const existingUser = await this.userDAO.updateSearchById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }

            const user = User.reconstruct(existingUser[0]);

            if (userUpdateDTO.password != undefined) {
                userUpdateDTO.password = await PasswordCrypto.hashPassword(userUpdateDTO.password);
            }

            user.update(userUpdateDTO);

            await this.userDAO.update(user);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string) {
        try{
            const existingUser = await this.userDAO.updateSearchById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            await this.userDAO.delete(id)
        }catch (error) {
            throw error;
        }
    }
}

