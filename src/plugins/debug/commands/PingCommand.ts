import * as Discord from 'discord.js';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class PingCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '^🏓$';

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot // Author is a bot.
		);
	}

	public async execute(): Promise<string> {
		return '🏓';
	}
}
