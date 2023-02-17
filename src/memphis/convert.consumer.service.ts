import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as memphis from 'memphis-dev';
import { Consumer, Memphis, Message } from 'memphis-dev/types';
import { BehaviorSubject, Observable } from "rxjs";
import { ConvertPriceDto } from "src/socket/convert.price.dto";

@Injectable()
export class MemphisConvertConsumerService implements OnModuleInit {
    channel3Subject=new BehaviorSubject(null)
    channel1Subject=new BehaviorSubject(null)
    channel2Subject=new BehaviorSubject(null)
    channel4Subject=new BehaviorSubject(null)
    
    
    constructor(@Inject("MEMPHIS_CONNECTION") private memphisConnection: Memphis) {
         }
    convertConsumerChannelOne: Consumer
    convertConsumerChannelTwo: Consumer
    convertConsumerChannelThree: Consumer
    convertConsumerChannelFour: Consumer

    async onModuleInit() {
        await this.convertConsumerConnection()
        await this.convertConsumerConnectionChannelTwo()
        await this.convertConsumerConnectionChannelThree()
        await this.convertConsumerConnectionChannelFour()

         this.convertConsume()
         this.convertConsumeChannelTwo()
         this.convertConsumeChannelThree()
         this.convertConsumeChannelFour()
    }

    async convertConsumerConnection() {
        try {
            this.convertConsumerChannelOne = await this.memphisConnection.consumer({
                stationName: 'convert_channel_five',
                consumerName: 'one'
            });
        } catch (error) {
            process.exit()
        }
    }

    async convertConsumerConnectionChannelTwo() {
        try {
            this.convertConsumerChannelTwo = await this.memphisConnection.consumer({
                stationName: 'convert_channel_six',
                consumerName: 'two'
            });
        } catch (error) {
            process.exit()
        }
    }

    async convertConsumerConnectionChannelThree() {
        try {
            this.convertConsumerChannelThree = await this.memphisConnection.consumer({
                stationName: 'convert_channel_seven',
                consumerName: 'three'
            });
        } catch (error) {
            process.exit()
        }
    }

    async convertConsumerConnectionChannelFour() {
        try {
            this.convertConsumerChannelFour = await this.memphisConnection.consumer({
                stationName: 'convert_channel_eight',
                consumerName: 'four'
            }); 
        } catch (error) {
           process.exit()
        }
    }

    convertConsume() {
        try {
            this.convertConsumerChannelOne.on('message', (message: Message) => {
                message.ack()
                this.channel1Subject.next(message.getData())
            });
        } catch (e) {
            if("code" in e && e.code=="CONNECTION_CLOSED")
            {
              process.exit()
            }
        }
      
    }
     

    convertConsumeChannelTwo() {
      try {
        this.convertConsumerChannelTwo.on('message', (message: Message) => {
            message.ack()
            this.channel2Subject.next(message.getData())
        });
      } catch (e) {
        if("code" in e && e.code=="CONNECTION_CLOSED")
            {
              process.exit()
            }
      }
    }

    convertConsumeChannelThree() {

        try {
            this.convertConsumerChannelThree.on('message', (message: Message) => {
                message.ack()
                this.channel3Subject.next(message.getData())
            })
        } catch (e) {
            if("code" in e && e.code=="CONNECTION_CLOSED")
            {
              process.exit()
            }
        }
    }

    convertConsumeChannelFour() {

      try {
        this.convertConsumerChannelFour.on('message', (message: Message) => {
            message.ack()
            this.channel4Subject.next(message.getData())
        })
      } catch (e) {
        if("code" in e && e.code=="CONNECTION_CLOSED")
        {
          process.exit()
        }
      }
    }
}