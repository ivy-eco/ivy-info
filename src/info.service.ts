import { Injectable } from "@nestjs/common";
import { AExtensionService, ExtensionFunction, ExtensionService, SubscribableEvent, MessagesService, logWrapper } from "@ivy-eco/sdk";

@Injectable()
@ExtensionService()
export class InfoService extends AExtensionService {
    constructor(private messagesS: MessagesService) {
        super();
    }

    get endpoint(): string {
        return "help";
    }

    get events(): SubscribableEvent[]{
        return ["message.received"];
    }

    async commandNotFound(body, command: string): Promise<void> {
        this.reportMessage2(body, undefined, `${command} is not a command for this extension. 🫵🤣`)
    }

    async reportMessage(log, messageId, chatId, sessionId) {
        console.log(log);
        let finalLog = logWrapper(log, { starting: "*Ivy*\n─────────────────────" });

        if(!messageId){
            const { data: dataSend } = await this.messagesS.sendMessage(sessionId, {
                chatId,
                text: finalLog
            }) as { data: { messageId:string } };

            messageId = dataSend.messageId;
        } else {
            const { data: dataEdit } = await this.messagesS.editMessage(sessionId, {
                messageId,
                chatId,
                text: finalLog,
            });

            messageId = dataEdit.messageId;
        }

        return messageId;
    }

    async reportMessage2(body,  messageId, log) {
        const { data: dataReceived, sessionId } = body;
        const { chatId } = dataReceived;

        console.log(log);
        let finalLog = logWrapper(log, { starting: "*Ivy*\n─────────────────────" });

        if(!messageId){
            const { data: dataSend } = await this.messagesS.sendMessage(sessionId, {
                chatId,
                text: finalLog
            }) as { data: { messageId:string } };

            messageId = dataSend.messageId;
        } else {
            const { data: dataEdit } = await this.messagesS.editMessage(sessionId, {
                messageId,
                chatId,
                text: finalLog,
            });

            messageId = dataEdit.messageId;
        }

        return messageId;
    }

    @ExtensionFunction("_default")
    async help(body){
        const { data: dataReceived, sessionId } = body;
        const { chatId } = dataReceived;

        await this.reportMessage("* `/mc`", undefined, chatId, sessionId);

        return { success: true }
    }
}