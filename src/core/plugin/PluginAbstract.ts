import {Bot} from '../Bot';
import {CommandConstructor} from '../command/CommandConstructor';
import {BehaviorConstructor} from '../Behavior/BehaviorConstructor';

export abstract class PluginAbstract {
	public readonly commands: CommandConstructor[] = [];
	public readonly behaviors: BehaviorConstructor[] = [];

	protected bot: Bot;

	public constructor(bot: Bot) {
		this.bot = bot;
	}

	public load(): void {}
}
