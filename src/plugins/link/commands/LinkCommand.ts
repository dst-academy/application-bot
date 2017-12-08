import * as Discord from 'discord.js';
import * as got from 'got';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class LinkCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '!!([\\w-]+)';
	private cache: Map<any, any> = new Map();

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server // Origin is a foreign server.
		);
	}

	public async execute(parameters: string[]): Promise<string> {
		const key = parameters[1];

		return this.fetch(key)
			.then((url: string) => {
				return `${url} ― ${key}`;
			});
	}

	private async fetch(key: string): Promise<string> {
		const url = `https://d3a7.link/${key}`;

		return got.head(url, {
			cache: this.cache,
			followRedirect: false,
		}).then(() => url);
	}
}
