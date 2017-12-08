import * as Discord from 'discord.js';
import * as colors from '../../../resources/colors.json';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class ColorsCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '^\\?colors$';

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server || // Origin is a foreign server.
			message.member !== message.guild.owner // Author is not the server owner.
		);
	}

	public async execute(): Promise<Discord.RichEmbed> {
		const embed = new Discord.RichEmbed()
			.setFooter('― colors');

		Object.entries(colors).forEach(([name, value]: string[]) => {
			embed.addField(name, value, true);
		});

		return embed;
	}
}
