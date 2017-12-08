import * as Discord from 'discord.js';
import {BehaviorAbstract} from '../../../core/Behavior/BehaviorAbstract';
import {BehaviorInterface} from '../../../core/Behavior/BehaviorInterface';

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
