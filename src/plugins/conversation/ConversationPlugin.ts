import {PluginAbstract} from '../../core/plugin/PluginAbstract';
import {PluginInterface} from '../../core/plugin/PluginInterface';
import {BehaviorConstructor} from '../../core/behavior/BehaviorConstructor';
import {ClapBehavior} from './behaviors/ClapBehavior';
import {PokeBehavior} from './behaviors/PokeBehavior';
import {ReactBehavior} from './behaviors/ReactBehavior';
import {WaveBehavior} from './behaviors/WaveBehavior';

export class ConversationPlugin extends PluginAbstract implements PluginInterface {
	public readonly behaviors: BehaviorConstructor[] = [
		ClapBehavior,
		WaveBehavior,
		PokeBehavior,
		ReactBehavior,
	];
}
