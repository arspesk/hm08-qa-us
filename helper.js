module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },
    getCreditCardNumber: function() {
        const cardNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
        return `${cardNumber}`
    },
    getCVVCode: function() {
        const cvvCode = Math.floor(10 + Math.random() * 90)
        return `${cvvCode}`
    },
    getIceCreamCount: async function(obj) {
        return await $(`//div[@class="counter-value" and text()="${obj.toString()}"][1]`);
    },
};
