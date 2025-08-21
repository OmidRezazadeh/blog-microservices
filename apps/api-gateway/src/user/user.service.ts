import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
@Inject('USER_SERVICE') private readonly rabbitClient:ClientProxy
    ){}
    async getAll(){
        console.log('step two')
    return await firstValueFrom(
        this.rabbitClient.send('user.getAll',{})
    )
    }
}
