import { Injectable } from "@nestjs/common";
import { ConvertPriceDto } from "./convert.price.dto";
import { PriceGateway } from "./pricing.gateway";
import { PriceSendToAllRQ } from "./send.to.all.rq.dto";

@Injectable()
export class PricingService{
    constructor(private priceGateway:PriceGateway){}
    priceOtc(sendToAll:PriceSendToAllRQ){
        if(sendToAll.to.toLowerCase()=='irr')
        this.priceGateway.sendToAllPricesOtc(sendToAll)

        else 
        this.priceGateway.sendToAllPricesOtcNoneIrr(sendToAll)
    }

    priceConvert(convertPrice:ConvertPriceDto){
     if(convertPrice.to_crypto.toLowerCase()=='irr')
     this.priceGateway.sendToAllPricesOtc(convertPrice)

     else 
        this.priceGateway.sendToAllPricesOtcNoneIrr(convertPrice)
    }
}