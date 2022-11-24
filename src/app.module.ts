import { Module } from '@nestjs/common';
import { MemphisModule } from './memphis/memphis.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [MemphisModule, SocketModule]
})
export class AppModule {}
