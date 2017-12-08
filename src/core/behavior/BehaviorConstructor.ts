import {Bot} from '../Bot';
import {PluginInterface} from '../plugin/PluginInterface';
import {BehaviorInterface} from './BehaviorInterface';

export interface BehaviorConstructor {
	new(bot: Bot, plugin: PluginInterface): BehaviorInterface;
}
