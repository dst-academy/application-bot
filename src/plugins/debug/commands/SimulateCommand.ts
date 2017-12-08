import * as Discord from 'discord.js';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class SimulateCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '~join';

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server || // Origin is a foreign server.
			message.member !== message.guild.owner // Author is not the server owner.
		);
	}

	public async execute(parameters: string[], message: Discord.Message): Promise<string> {
		this.bot.client.emit('guildMemberAdd', message.member);
		return ':thumbsup: ― join';
	}
}
