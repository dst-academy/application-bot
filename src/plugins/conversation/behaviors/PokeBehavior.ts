import * as Discord from 'discord.js';
import {BehaviorAbstract} from '../../../core/behavior/BehaviorAbstract';
import {BehaviorInterface} from '../../../core/behavior/BehaviorInterface';

export class PokeBehavior extends BehaviorAbstract implements BehaviorInterface {
	public readonly event: string = 'message';

	public execute(...parameters: any[]): void {
		const message = parameters[0] as Discord.Message;

		if (message.author.bot) return;

		if (message.content.match(/pokes <@\d+>/) && message.mentions.users.array().includes(this.bot.client.user)) {
			this.bot.type(message.channel, `_pokes ${message.author} back._`);
		}
	}
}
