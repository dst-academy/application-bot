import {Bot} from '../Bot';
import {PluginInterface} from '../plugin/PluginInterface';

export abstract class CommandAbstract {
	protected bot: Bot;
	protected plugin: PluginInterface;

	public constructor(bot: Bot, plugin: PluginInterface) {
		this.bot = bot;
		this.plugin = plugin;
	}

	public load(): void {}
}
