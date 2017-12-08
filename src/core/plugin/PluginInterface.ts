import {Bot} from '../Bot';
import {CommandConstructor} from '../command/CommandConstructor';
import {BehaviorConstructor} from '../behavior/BehaviorConstructor';

export interface PluginInterface {
	readonly commands: CommandConstructor[];
	readonly behaviors: BehaviorConstructor[];

	load(): void;
}

export interface PluginConstructor {
	new(bot: Bot): PluginInterface;
}
