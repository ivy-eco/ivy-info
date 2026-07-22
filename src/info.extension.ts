import { Module } from "@nestjs/common";
import { InfoService } from "./info.service";
import { InfoController } from "./info.controller";

@Module({
    imports: [],
    providers: [InfoService],
    exports: [InfoService],
    controllers: [InfoController]
})
export class InfoExtension {}