export interface BehaviorInterface {
	readonly event: string;

	load(): void;
	execute(...parameters: any[]): void;
}
