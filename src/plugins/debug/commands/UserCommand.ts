import * as Discord from 'discord.js';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class UserCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '\\?user(?: (\\d+))?';

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server || // Origin is a foreign server.
			message.member !== message.guild.owner // Author is not the server owner.
		);
	}

	public async execute(parameters: string[], message: Discord.Message): Promise<Discord.RichEmbed|void> {
		const identifier = parameters[1] as string;
		const member = identifier ? message.guild.members.get(identifier)! : message.member;

		if (member) {
			return new Discord.RichEmbed()
				.addField('ID', member.id, true)
				.addField('Username', member.user.username, true)
				.addField('Tag', member.user.tag || '-', true)
				.addField('Discriminator', member.user.discriminator, true)
				.addField('Name', member.displayName, true)
				.addField('Nickname', member.nickname || '-', true)
				.addField('Bot', member.user.bot ? 'yes' : 'no', true)
				.addField('Status', member.presence.status, true)
				.addField('Joined', new Date(member.joinedTimestamp).toDateString(), true)
				.addField('Playing', member.presence.game ? member.presence.game.name : '-', true)
				.addField('Roles', member.roles.array().join(' '))
				.setThumbnail(member.user.avatarURL)
				.setFooter('― user');
		}
	}
}
