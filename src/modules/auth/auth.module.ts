import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { AuthStrategy } from './auth.strategy';
import { ConfigEnum } from '../../enum/config.enum';
import { CaslAbilityService } from './casl-ability.service';
@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: config.get(ConfigEnum.SECRET),
          signOptions: {
            expiresIn: '1d', //过期时间1天
          },
        };
      },
    }),
  ],
  providers: [AuthService, AuthStrategy, CaslAbilityService],
  controllers: [AuthController],
  exports: [CaslAbilityService],
})
export class AuthModule {}
