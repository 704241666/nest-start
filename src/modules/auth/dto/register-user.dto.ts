import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    // $value:当前传入的值
    // $property:当前属性名
    // $target:当前类
    // $constraint1:第一个参数
    // $constraint2:第二个参数
    // ...以此类推
    message: '用户名不合格',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
