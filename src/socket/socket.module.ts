import { Module } from '@nestjs/common';
import { PriceGateway } from './pricing.gateway';
import { PricingService } from './pricing.service';

@Module({
    providers:[PricingService,PriceGateway],
    exports:[PricingService]
})
export class SocketModule {}
