import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as memphis from 'memphis-dev';
import { Consumer, Memphis, Message } from 'memphis-dev/types';
import { PricingService } from "src/socket/pricing.service";

@Injectable()
export class MemphisConvertConsumerService implements OnModuleInit{
    constructor(@Inject("MEMPHIS_CONNECTION") private memphisConnection: Memphis,
    private pricingService:PricingService){}
    convertConsumerChannelOne:Consumer
    convertConsumerChannelTwo:Consumer
    convertConsumerChannelThree:Consumer

    async onModuleInit() {
        await this.convertConsumerConnection()
        await this.convertConsumerConnectionChannelTwo()
        await this.convertConsumerConnectionChannelThree()

        await this.convertConsume()
        await this.convertConsumeChannelTwo()
        await this.convertConsumeChannelThree()
    }

    async convertConsumerConnection(){
        this.convertConsumerChannelOne=await this.memphisConnection.consumer({
            stationName: 'convert',
            consumerName: 'convert_consumer_channel_one'
        });
    }

    async convertConsumerConnectionChannelTwo(){
        this.convertConsumerChannelTwo=await this.memphisConnection.consumer({
            stationName: 'convert',
            consumerName: 'convert_consumer_channel_two'
        });
    }

    async convertConsumerConnectionChannelThree(){
        this.convertConsumerChannelThree=await this.memphisConnection.consumer({
            stationName: 'convert',
            consumerName: 'convert_consumer_channel_three'
        });
    }


    async convertConsume(){
        this.convertConsumerChannelOne.on('message', (message: Message) => {
            try {
                const res=JSON.parse(message.getData().toString())
                this.pricingService.priceConvert(res)
            } catch (error) {
                
            }
           
        });

        this.convertConsumerChannelOne.on('error', (error) => {
        
        });
    }


async convertConsumeChannelTwo(){
    this.convertConsumerChannelTwo.on('message', (message: Message) => {
        try {
            const res=JSON.parse(message.getData().toString())
            this.pricingService.priceConvert(res)
        } catch (error) {
            
        }
    });

    this.convertConsumerChannelTwo.on('error', (error) => {
    
    });
}

async convertConsumeChannelThree(){
    
    this.convertConsumerChannelThree.on('message', (message: Message) => {
        try {
            const res=JSON.parse(message.getData().toString())
            this.pricingService.priceConvert(res)
        } catch (error) {
            
        }
    });
    
    this.convertConsumerChannelThree.on('error', (error) => {
    
    });
}
}