import { validPointsSurrounding, maxGridDimensions, numericGridFromInput } from './grid.js';

describe('utils/grid', () => {
	test('exports exist', () => {
		expect(typeof validPointsSurrounding).toBe('function');
		expect(typeof maxGridDimensions).toBe('function');
		expect(typeof numericGridFromInput).toBe('function');
	});

	test('validPointsSurrounding returns 4 neighbors for center without diagonals', () => {
		const point = { x: 1, y: 1 };
		const res = validPointsSurrounding(point, 3, 3, false);
		const expected = [
			{ x: 0, y: 1 },
			{ x: 2, y: 1 },
			{ x: 1, y: 0 },
			{ x: 1, y: 2 }
		];
		expect(res).toEqual(expect.arrayContaining(expected));
		expect(res).toHaveLength(4);
	});

    test('validPointsSurrounding returns 8 neighbors for center with diagonals', () => {
        const point = { x: 1, y: 1 };
        const res = validPointsSurrounding(point, 3, 3, true);
        const expected = [
            { x: 0, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 2 },
            { x: 0, y: 0 },
            { x: 0, y: 2 },
            { x: 2, y: 0 },
            { x: 2, y: 2 }
        ];
        expect(res).toEqual(expect.arrayContaining(expected));
        expect(res).toHaveLength(8);
    });

    test('validPointsSurrounding excludes out-of-bounds points', () => {
        const point = { x: 0, y: 0 };
        const res = validPointsSurrounding(point, 3, 3, true);
        const expected = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
        ];
        expect(res).toEqual(expect.arrayContaining(expected));
        expect(res).toHaveLength(3);
    });

    test('validPointsSurrounding excludes out-of-bounds points with diagonals at outer edge', () => {
        const point = { x: 1, y: 2 };
        const res = validPointsSurrounding(point, 3, 3, true);
        const expected = [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 2, y: 2 }
        ];
        expect(res).toEqual(expect.arrayContaining(expected));
        expect(res).toHaveLength(5);
    });

	test('maxGridDimensions returns correct maxX and maxY for array of strings', () => {
		const input = ['12', '34', '56'];
		const dims = maxGridDimensions(input);
		expect(dims).toEqual({ maxX: 3, maxY: 2 });
	});

	test('numericGridFromInput converts strings to numeric 2D array', () => {
		const input = ['12', '34'];
		const grid = numericGridFromInput(input);
		expect(grid).toEqual([[1, 2], [3, 4]]);
	});
});
