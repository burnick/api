import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
// import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/models/user.models';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';
import { UserSignupInput } from './dto/user-signup';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUserAdmin(
  //   username: string,
  //   password: string,
  // ): Promise<Partial<User>> {
  //   const user = await this.usersService.findOne(username);
  //   if (!user) {
  //     return null;
  //   }

  //   const valid = await bcrypt.compare(password, user?.password);
  //   const noAdminRole = !!!user?.roles.find(
  //     (role) => role.name.toLowerCase() === 'admin',
  //   );
  //   console.log('===', noAdminRole);
  //   if (noAdminRole) {
  //     return null;
  //   }
  //   if (user && valid) {
  //     //dont show password
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser({
    username,
    password,
  }: UserSignupInput): Promise<Partial<User>> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user?.password);
    if (user && valid) {
      //dont show password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this.usersService.create({
      ...loginUserInput,
      name: loginUserInput.email,
      password,
      updatedAt: new Date(),
    });
  }
}
