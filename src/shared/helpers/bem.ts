type BemClasses = (
	blockName: string
) => [string, (modifierName: string) => string, (elementName: string) => ReturnType<BemClasses>];

export const bemClasses: BemClasses = (blockName: string) => [
	blockName,
	(modifierName): string => `${blockName}--${modifierName}`,
	(elementName): ReturnType<BemClasses> => bemClasses(`${blockName}__${elementName}`)
];
