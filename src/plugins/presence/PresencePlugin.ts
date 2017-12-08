import * as Discord from 'discord.js';
import {PluginAbstract} from '../../core/plugin/PluginAbstract';
import {PluginInterface} from '../../core/plugin/PluginInterface';
import {BehaviorConstructor} from '../../core/behavior/BehaviorConstructor';
import {IdleBehavior} from './behaviors/IdleBehavior';

export class PresencePlugin extends PluginAbstract implements PluginInterface {
	public readonly behaviors: BehaviorConstructor[] = [
		IdleBehavior,
	];

	public idle(): Promise<Discord.ClientUser> {
		return this.bot.client.user.setPresence({status: 'idle'});
	}

	public busy(game: string = ''): Promise<Discord.ClientUser> {
		const presence: Discord.PresenceData = {status: 'online'};
		game && (presence.game = {name: game});

		return this.bot.client.user.setPresence(presence);
	}
}
