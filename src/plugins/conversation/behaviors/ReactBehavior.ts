import * as Discord from 'discord.js';
import {BehaviorAbstract} from '../../../core/Behavior/BehaviorAbstract';
import {BehaviorInterface} from '../../../core/Behavior/BehaviorInterface';

export class ReactBehavior extends BehaviorAbstract implements BehaviorInterface {
	public readonly event: string = 'messageReactionAdd';

	public execute(...parameters: any[]): void {
		const reaction = parameters[0] as Discord.MessageReaction;
		const user = parameters[1] as Discord.User;

		if (user.bot) return;

		if (!reaction.me && Math.random() >= .9) {
			reaction.message.react(reaction.emoji);
		}
	}
}
