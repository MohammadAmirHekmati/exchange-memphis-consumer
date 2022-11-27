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
        this.convertConsumerChannelOne = await this.memphisConnection.consumer({
            stationName: 'convert_channel_one',
            consumerName: 'one'
        });
    }

    async convertConsumerConnectionChannelTwo() {
        this.convertConsumerChannelTwo = await this.memphisConnection.consumer({
            stationName: 'convert_channel_two',
            consumerName: 'two'
        });
    }

    async convertConsumerConnectionChannelThree() {
        this.convertConsumerChannelThree = await this.memphisConnection.consumer({
            stationName: 'convert_channel_three',
            consumerName: 'three'
        });
    }

    async convertConsumerConnectionChannelFour() {
        this.convertConsumerChannelFour = await this.memphisConnection.consumer({
            stationName: 'convert_channel_four',
            consumerName: 'four'
        });
    }

    convertConsume() {
        this.convertConsumerChannelOne.on('message', (message: Message) => {
            message.ack()
            this.channel1Subject.next(message.getData())
        });
    }
     

    convertConsumeChannelTwo() {
        this.convertConsumerChannelTwo.on('message', (message: Message) => {
            message.ack()
            this.channel2Subject.next(message.getData())
        });
    }

    convertConsumeChannelThree() {

        this.convertConsumerChannelThree.on('message', (message: Message) => {
            message.ack()
            this.channel3Subject.next(message.getData())
        })
    }

    convertConsumeChannelFour() {

        this.convertConsumerChannelFour.on('message', (message: Message) => {
            message.ack()
            this.channel4Subject.next(message.getData())
        })
    }
}