import {PluginAbstract} from '../../core/plugin/PluginAbstract';
import {PluginInterface} from '../../core/plugin/PluginInterface';
import {CommandConstructor} from '../../core/command/CommandConstructor';
import {WikiCommand} from './commands/WikiCommand';

export class WikiPlugin extends PluginAbstract implements PluginInterface {
	public readonly commands: CommandConstructor[] = [
		WikiCommand,
	];
}
