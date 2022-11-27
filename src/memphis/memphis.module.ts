import { Module } from '@nestjs/common';
import { SocketModule } from 'src/socket/socket.module';
import { MemphisConsumerService } from './consumer.service';
import { MemphisConvertConsumerService } from './convert.consumer.service';
import { MemphisConnection } from './memphis.connection.service';

@Module({
    imports:[],
    providers:[MemphisConnection,MemphisConsumerService,MemphisConvertConsumerService],
    exports:[MemphisConsumerService,MemphisConvertConsumerService]
})
export class MemphisModule {}
