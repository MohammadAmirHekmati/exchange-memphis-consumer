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
        try {
            this.otcConsumerChannelOne=await this.memphisConnection.consumer({
                stationName: 'otc_channel_five',
                consumerName: 'channel_three'
            });
        } catch (error) {
            process.exit()
        }
    }


    async otcConsumerConnectionChannelTwo(){
        try {
            this.otcConsumerChannelTwo=await this.memphisConnection.consumer({
                stationName: 'otc_channel_six',
                consumerName: 'channel_two'
            }); 
        } catch (error) {
           process.exit()
        }
    }


    async otcConsumerConnectionChannelThree(){
        try {
            this.otcConsumerChannelThree=await this.memphisConnection.consumer({
                stationName: 'otc_channel_seven',
                consumerName: 'channel_three'
            });
        } catch (error) {
            process.exit()
        }
    }

    async otcConsumerConnectionChannelFour(){
        try {
            this.otcConsumerChannelFour=await this.memphisConnection.consumer({
                stationName: 'otc_channel_eight',
                consumerName: 'channel_four'
            });
        } catch (error) {
            process.exit()
        }
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