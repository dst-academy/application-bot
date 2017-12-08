import * as Discord from 'discord.js';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class EightballCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '^🎱.+';

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server // Origin is a foreign server.
		);
	}

	public async execute(): Promise<string> {
		const answer = Math.random() > .5 ? 'Clearly YES.' : 'Simply NO.';

		return `${answer} ― 🎱`;
	}
}
