import * as Discord from 'discord.js';
import * as got from 'got';
import * as sanitize from 'sanitize-html';
import {CommandAbstract} from '../../../core/command/CommandAbstract';
import {CommandInterface} from '../../../core/command/CommandInterface';

export class WikiCommand extends CommandAbstract implements CommandInterface {
	public readonly pattern: string = '^\\?wiki (.+)$';
	private cache: Map<any, any> = new Map();

	public async permit(message: Discord.Message): Promise<boolean> {
		return !(
			message.author.bot || // Author is a bot.
			message.guild.id !== this.bot.configuration.server // Origin is a foreign server.
		);
	}

	public async execute(parameters: string[]): Promise<Discord.RichEmbed|string|void> {
		const phrase = parameters[1];
		const items = await this.fetch(phrase);

		if (!items || !items.length) return;

		const item = items[0];
		const description = sanitize(item.snippet, {allowedTags: []});

		return new Discord.RichEmbed()
			.setTitle(item.title)
			.setDescription(description)
			.setURL(item.url)
			.setFooter('― wiki');
	}

	private async fetch(phrase: string): Promise<any[]|null> {
		const url = `https://dontstarve.wikia.com/api/v1/Search/List?query=${phrase}`;

		return got.get(url, {
			cache: this.cache,
			followRedirect: true,
			json: true,
		}).then((response: any) => {
			return response.body.items;
		}).catch(() => null);
	}
}
