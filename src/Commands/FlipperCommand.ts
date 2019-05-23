import { Command, CommandBase, CommandParser, Event } from '@autobot/common';

/**
 *
 */
@Command
export class FlipperCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!flip',
            group: 'fun',
            description: 'Flips for a value between "|"s'

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        const split = command.arguments[ 0 ].name.split('|');

        if (split.length > 0) {

            command.obj.channel.send(split[ Math.floor(Math.random() * split.length) ]);

        }

    }

}
