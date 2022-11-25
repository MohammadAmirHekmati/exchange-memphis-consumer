import { Inject, Injectable, OnModuleInit } from "@nestjs/common"
import { Consumer, Memphis, Message } from 'memphis-dev/types';
import { PricingService } from "src/socket/pricing.service";

@Injectable()
export class MemphisConsumerService implements OnModuleInit{
    constructor(@Inject("MEMPHIS_CONNECTION") private memphisConnection: Memphis,
    private pricingService:PricingService){}
    otcConsumerChannelOne:Consumer
    otcConsumerChannelTwo:Consumer
    otcConsumerChannelThree:Consumer

    async onModuleInit() {
        await this.otcConsumerConnection()
        await this.otcConsumerConnectionChannelTwo()
        await this.otcConsumerConnectionChannelThree()

        await this.otcConsume()
        await this.otcConsumeChannelTwo()
        await this.otcConsumeChannelThree()
    }


    async otcConsumerConnection(){
        this.otcConsumerChannelOne=await this.memphisConnection.consumer({
            stationName: 'otc',
            consumerName: 'otc_consumer_channel_one'
        });
    }


    async otcConsumerConnectionChannelTwo(){
        this.otcConsumerChannelTwo=await this.memphisConnection.consumer({
            stationName: 'otc',
            consumerName: 'otc_consumer_channel_two'
        });
    }


    async otcConsumerConnectionChannelThree(){
        this.otcConsumerChannelThree=await this.memphisConnection.consumer({
            stationName: 'otc',
            consumerName: 'otc_consumer_channel_three'
        });
    }

    async otcConsume(){
            this.otcConsumerChannelOne.on('message', (message: Message) => {
                try {
                    const res= JSON.parse(message.getData().toString())
                    
                    this.pricingService.priceOtc(res)
                } catch (error) {
                    
                }
            });
    
            this.otcConsumerChannelOne.on('error', (error) => {
            });
    }


    async otcConsumeChannelTwo(){
        this.otcConsumerChannelTwo.on('message', (message: Message) => {
            try {
                const res= JSON.parse(message.getData().toString())
                
                this.pricingService.priceOtc(res)
            } catch (error) {
                
            }
          
        });

        this.otcConsumerChannelTwo.on('error', (error) => {
        });
}


async otcConsumeChannelThree(){
  
    this.otcConsumerChannelThree.on('message', (message: Message) => {
        try {
            const res= JSON.parse(message.getData().toString())
            
            this.pricingService.priceOtc(res)
        } catch (error) {
            
        }
    });

    this.otcConsumerChannelThree.on('error', (error) => {
    });
}


}