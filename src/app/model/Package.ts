import { Feature } from './Feature';

export class Package {
	id: string;
	title: string;
	price: number;
	currency: string;
	thumbnail: string;
	description: string;
	duration: string;
	photoAmount: number;
	photographerChoicePhotosAmount: number;
	features: Array<Feature>;
	notes: Array<string>;
	visible: boolean;
}

