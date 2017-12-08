import {PluginAbstract} from '../../core/plugin/PluginAbstract';
import {PluginInterface} from '../../core/plugin/PluginInterface';
import {CommandConstructor} from '../../core/command/CommandConstructor';
import {EightballCommand} from './commands/EightballCommand';

export class CommonPlugin extends PluginAbstract implements PluginInterface {
	public readonly commands: CommandConstructor[] = [
		EightballCommand,
	];
}
