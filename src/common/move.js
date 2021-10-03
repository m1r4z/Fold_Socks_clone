const arrayMoveMutate = (array, from, to) => {
	const startIndex = to < 0 ? array.length + to : to;

	if (startIndex >= 0 && startIndex < array.length) {
		const item = array.splice(from, 1)[0];
		array.splice(startIndex, 0, item);
	}
};

export default (array, from, to) => {
	const newArray = [...array];
	arrayMoveMutate(newArray, from, to);
	return newArray;
};
