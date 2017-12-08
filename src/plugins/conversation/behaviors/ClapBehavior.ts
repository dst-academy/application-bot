import * as Discord from 'discord.js';
import {BehaviorAbstract} from '../../../core/behavior/BehaviorAbstract';
import {BehaviorInterface} from '../../../core/behavior/BehaviorInterface';

export class ClapBehavior extends BehaviorAbstract implements BehaviorInterface {
	public readonly event: string = 'message';

	public execute(...parameters: any[]): void {
		const message = parameters[0] as Discord.Message;

		if (message.author.bot) return;

		if (message.content.match(/^👏$/)) {
			this.bot.type(message.channel, '👏');
		}
	}
}
