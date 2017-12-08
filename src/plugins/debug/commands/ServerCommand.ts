import * as Discord from 'discord.js';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class ServerCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '^\\?server$';

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server || // Origin is a foreign server.
			message.member !== message.guild.owner // Author is not the server owner.
		);
	}

	public async execute(parameters: string[], message: Discord.Message): Promise<Discord.RichEmbed|void> {
		const server = message.guild;

		if (server) {
			return new Discord.RichEmbed()
				.addField('ID', server.id, true)
				.addField('Name', server.name, true)
				.addField('Region', server.region, true)
				.addField('Channels', server.channels.size, true)
				.addField('Roles', server.roles.size, true)
				.addField('Emoji', server.emojis.size, true)
				.addField('Members, total', server.members.size, true)
				.addField('Members, online', server.presences.findAll('status', 'online').length, true)
				.addField('Members, playing', server.presences.filter((presence: Discord.Presence) => !!presence.game).size, true)
				.addField('Created', new Date(server.createdTimestamp).toDateString(), true)
				.setThumbnail(server.iconURL)
				.setFooter('― server');
		}
	}
}
