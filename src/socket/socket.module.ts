import { Module } from '@nestjs/common';
import { MemphisModule } from 'src/memphis/memphis.module';
import { PriceGateway } from './pricing.gateway';

@Module({
    imports:[MemphisModule],
    providers:[PriceGateway],
    exports:[]
})
export class SocketModule {}
