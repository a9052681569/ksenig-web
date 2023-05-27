/**
 * помогает получить нужное склонение слова, когда оно зависит от какого-то числа
 *
 * @param number число для которого будем склонять
 * @param titles массив форм слова/фразы. Можно ориентироваться формулируя под числа [1, 2, 5]
 *
 * @example
 * pluralize(5, ['одно слово', 'два слова', 'пять слов']) => 'пять слов'
 *
 * @returns нужную форму слова в зависимости от переданного числа
 */
export const pluralize = (number: number, titles: [string, string, string]): string => {
	const cases: number[] = [2, 0, 1, 1, 1, 2];

	const casesIndex: number = number % 10 < 5 ? number % 10 : 5;

	// тайпскрипт не уверен что будет выбран существующий элемент массива,
	// например cases[20] вернет undefined,
	// но математика говорит что невозможно получить casesIndex больше 5,
	// поэтому мы обманываем тайпскрипт, вероятно есть более элегантное решение, знаешь - примени
	const selectedCase = cases[casesIndex] as number;

	const outcomeIndex: number = number % 100 > 4 && number % 100 < 20 ? 2 : selectedCase;

	return titles[outcomeIndex] as string;
};
