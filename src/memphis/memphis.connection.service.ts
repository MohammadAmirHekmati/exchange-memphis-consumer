import { Provider } from "@nestjs/common";
import * as memphis from 'memphis-dev';

export const MemphisConnection:Provider={
    provide:"MEMPHIS_CONNECTION",
    useFactory:async ()=>{
        const client=await memphis.connect({
            host: '192.168.10.200',
            username: 'hampa',
            connectionToken: 'memphis',
            reconnect:true,
            timeoutMs:10000
        });
        return client
    }
}