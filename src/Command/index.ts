import { Store } from "state-range";

export type CommandType = {
    key: string;
    callback: (data?: any) => void;
}

class CommandFactory extends Store<CommandType> { }
const factory = new CommandFactory

class Command {
    create(key: string, callback: (data?: any) => void) {
        if (!factory.findFirst({ key })) {
            factory.insert({ key, callback })
        }
    }

    excute(key: string, data?: any) {
        const cmd = factory.findFirst({ key })
        cmd?.callback(data)
    }
}


export default new Command