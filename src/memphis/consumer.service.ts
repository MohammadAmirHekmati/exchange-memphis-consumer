import { Inject, Injectable, OnModuleInit } from "@nestjs/common"
import { Consumer, Memphis, Message } from 'memphis-dev/types';
import {BehaviorSubject} from "rxjs"

@Injectable()
export class MemphisConsumerService implements OnModuleInit{
    otcChannel1Subject=new BehaviorSubject(null)
    otcChannel2Subject=new BehaviorSubject(null)
    otcChannel3Subject=new BehaviorSubject(null) 
    otcChannel4Subject=new BehaviorSubject(null) 
    constructor(@Inject("MEMPHIS_CONNECTION") private memphisConnection: Memphis){}
    otcConsumerChannelOne:Consumer
    otcConsumerChannelTwo:Consumer
    otcConsumerChannelThree:Consumer
    otcConsumerChannelFour:Consumer

    async onModuleInit() {
        await this.otcConsumerConnection()
        await this.otcConsumerConnectionChannelTwo()
        await this.otcConsumerConnectionChannelThree()
        await this.otcConsumerConnectionChannelFour()

         this.otcConsume()
         this.otcConsumeChannelTwo()
         this.otcConsumeChannelThree()
        this.otcConsumeChannelFour()
    }


    async otcConsumerConnection(){
        this.otcConsumerChannelOne=await this.memphisConnection.consumer({
            stationName: 'otc_channel_one',
            consumerName: 'channel_three'
        });
    }


    async otcConsumerConnectionChannelTwo(){
        this.otcConsumerChannelTwo=await this.memphisConnection.consumer({
            stationName: 'otc_channel_two',
            consumerName: 'channel_two'
        });
    }


    async otcConsumerConnectionChannelThree(){
        this.otcConsumerChannelThree=await this.memphisConnection.consumer({
            stationName: 'otc_channel_three',
            consumerName: 'channel_three'
        });
    }

    async otcConsumerConnectionChannelFour(){
        this.otcConsumerChannelFour=await this.memphisConnection.consumer({
            stationName: 'otc_channel_four',
            consumerName: 'channel_four'
        });
    }

     otcConsume(){
        try {
            this.otcConsumerChannelOne.on('message', (message: Message) => {
                message.ack()
                    this.otcChannel1Subject.next(message.getData())
            });
        } catch (e) {
            if("code" in e && e.code=="CONNECTION_CLOSED")
            {
              process.exit()
            }
        }
          
    }


     otcConsumeChannelTwo(){
      try {
        this.otcConsumerChannelTwo.on('message', (message: Message) => {
            message.ack()
            this.otcChannel2Subject.next(message.getData())
        });
      } catch (e) {
        if("code" in e && e.code=="CONNECTION_CLOSED")
        {
          process.exit()
        }
      }
}


 otcConsumeChannelThree(){
  
   try {
    this.otcConsumerChannelThree.on('message', (message: Message) => {
        message.ack()
    
    this.otcChannel3Subject.next(message.getData())
});
   } catch (e) {
    if("code" in e && e.code=="CONNECTION_CLOSED")
    {
      process.exit()
    }
   }
}

otcConsumeChannelFour(){
  
    try {
        this.otcConsumerChannelFour.on('message', (message: Message) => {
            message.ack()
        this.otcChannel4Subject.next(message.getData())
    });
    } catch (e) {
        if("code" in e && e.code=="CONNECTION_CLOSED")
    {
      process.exit()
    }
    }
}


}