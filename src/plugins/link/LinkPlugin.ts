import {PluginAbstract} from '../../core/plugin/PluginAbstract';
import {PluginInterface} from '../../core/plugin/PluginInterface';
import {CommandConstructor} from '../../core/command/CommandConstructor';
import {LinkCommand} from './commands/LinkCommand';

export class LinkPlugin extends PluginAbstract implements PluginInterface {
	public readonly commands: CommandConstructor[] = [
		LinkCommand,
	];
}
