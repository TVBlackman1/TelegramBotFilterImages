const replies = {
    bot: {
        serverError: 'Server error. Try again later.',
        photoTextMessage: 'Its your filtered image',
        start: 'Hello! Send me photo and get pretty result!',
        alreadyAdded: 'Hello again! You can send me photo and get pretty result!',
        requestPhoto: 'Please, send me you photo',
        pickFilter: 'Please, pick filter or get final image',
    },
    user: {
        pickFilter: {
            blur: '1. Смазать',
            darker: '2. Яркость -',
            lighter: '3. Яркость +',
        },
    }
}

export {
    replies,
};