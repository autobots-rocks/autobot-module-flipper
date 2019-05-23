import { Command, CommandBase, CommandParser, DB, Event } from '@autobot/common';
import { RichEmbed }                                      from 'discord.js';
import { KarmaPoint }                                     from '../DB/KarmaPoint';

/**
 *
 */
@Command
export class SomeCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!leaderboard',
            group: 'fun',
            description: 'Displays the karma leaderboard.',
            entities: [ KarmaPoint ]

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        const results = await DB.connection.getRepository(KarmaPoint)
                                .createQueryBuilder('karma_point')
                                .select([ 'to_userid', 'to_discriminator', 'to_username', 'COUNT(karma_point.id) AS total' ])
                                .orderBy('total', 'DESC')
                                .groupBy('to_userid,to_discriminator,to_username')
                                .limit(22)
                                .getRawMany();

        const embed = new RichEmbed().setTitle('Karma Points Leaderboard')
                                     .setColor(3447003);

        results.forEach(row => {

            embed.addField(`❯ ${ row.total } points`, `<@${ row.to_userid }>`);

        });

        command.obj.channel.send(embed);

    }

}
