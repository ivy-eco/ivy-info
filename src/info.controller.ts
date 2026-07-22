import { Body, Controller, Post } from '@nestjs/common';
import { InfoService } from './info.service';
import { AExtensionController, type ReceivedMessageEvent } from '@ivy-eco/sdk';

@Controller('info')
export class InfoController extends AExtensionController<InfoService> {
    constructor(infoS: InfoService) {
        super(infoS);
    }

    @Post()
    async receiveMessage(@Body() body: ReceivedMessageEvent) {
        return this.handleData(body);
    }
}