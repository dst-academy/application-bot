import {Bot} from '../Bot';
import {PluginInterface} from '../plugin/PluginInterface';
import {CommandInterface} from './CommandInterface';

export interface CommandConstructor {
	new(bot: Bot, plugin: PluginInterface): CommandInterface;
}
