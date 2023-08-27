module.exports = { 
	handleDefaultProps(oldProps){
		return {
			...(oldProps.custom ? {} : { viewBox: '0 0 24 24', fill: 'currentColor', height: 24, width: 24}),
			...(oldProps.size ? {height: oldProps.size, width: oldProps.size} : {}),
			...oldProps,
			size: undefined,
			custom: undefined
	};
	}
}
