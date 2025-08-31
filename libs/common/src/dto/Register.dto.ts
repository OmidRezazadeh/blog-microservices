import { IsEmail, IsNotEmpty  } from "class-validator";
export class RegisterDto{
    @IsNotEmpty({ message: 'ایمیل نمی‌تواند خالی باشد' })
    @IsEmail({}, { message: 'ایمیل وارد شده صحیح نیست ' })
    email:string
    
    @IsNotEmpty()
    password:string
    
    @IsNotEmpty()
    name:string
    
}