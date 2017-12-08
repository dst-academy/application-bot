import {PluginAbstract} from '../../core/plugin/PluginAbstract';
import {PluginInterface} from '../../core/plugin/PluginInterface';
import {CommandConstructor} from '../../core/command/CommandConstructor';
import {ColorsCommand} from './commands/ColorsCommand';
import {PingCommand} from './commands/PingCommand';
import {ServerCommand} from './commands/ServerCommand';
import {SimulateCommand} from './commands/SimulateCommand';
import {StateCommand} from './commands/StateCommand';
import {UserCommand} from './commands/UserCommand';

export class DebugPlugin extends PluginAbstract implements PluginInterface {
	public readonly commands: CommandConstructor[] = [
		ColorsCommand,
		PingCommand,
		ServerCommand,
		SimulateCommand,
		StateCommand,
		UserCommand,
	];
}
