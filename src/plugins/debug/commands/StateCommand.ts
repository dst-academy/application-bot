import * as Discord from 'discord.js';
import * as prettyms from 'pretty-ms';
import * as prettybytes from 'pretty-bytes';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class StateCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '\\?state';

	private readonly status: string[] = [
		'ready',
		'connecting',
		'reconnecting',
		'idle',
		'nearly',
		'disconnected',
	];

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server || // Origin is a foreign server.
			message.member !== message.guild.owner // Author is not the server owner.
		);
	}

	public async execute(parameters: string[], message: Discord.Message): Promise<Discord.RichEmbed> {
		return new Discord.RichEmbed()
			.addField('Uptime', prettyms(this.bot.client.uptime, {secDecimalDigits: 0}), true)
			.addField('Latency', `${Math.ceil(this.bot.client.ping)} ms`, true)
			.addField('Status', this.status[this.bot.client.status], true)
			.addField('Memory', prettybytes(process.memoryUsage().rss), true)
			.addField('Ready', new Date(this.bot.client.readyTimestamp).toUTCString(), true)
			.setThumbnail(this.bot.client.user.avatarURL)
			.setFooter('― state');
	}
}
