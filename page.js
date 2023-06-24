module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    codeField: '#code',
    phoneNumberField: '#phone',
    cardNumberField: '#number',
    cvvCodeField: '//input[@id="code" and @class="card-input"]',
    messageForDriverField: '#comment',
    driverMessageField: '//input[@name="comment"]',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: '//div[starts-with(text(), "Supportive")]',
    businessPlanButton: '//div[starts-with(text(), "Business")]',
    paymentMethodButton: '//div[@class="pp-text"]',
    addCardButton: '//div[starts-with(text(), "Add card")]',
    linkButton: 'div[class="pp-buttons"] button[type="submit"]',
    blanketAndHandkerchiefsButton: '(//div[@class="switch"])[1]',
    iceCreamButton: '(//div[@class="counter-plus"])[1]',
    orderButton: '//div[@class="smart-button-wrapper"]',
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '//div[@class="payment-picker open"]',
    carSearchModal: '//div[@class="order-body"]',
    orderNumber: '//div[@class="order-number"]',
    tariffModal: '//div[@class="tariff-picker shown"]',
    // Browser keys
    tabButton: '\uE004',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addCreditCard: async function(cardNumber, cvvCode) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const paymentMethodModal = await $(this.paymentMethodModal);
        await paymentMethodModal.waitForDisplayed();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(cardNumber);
        const cvvCodeField = await $(this.cvvCodeField);
        await cvvCodeField.waitForDisplayed();
        await cvvCodeField.setValue(cvvCode);
        // Imitating user prssing "Tab" button, so 'Link' button will become active
        await browser.keys(this.tabButton);
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
    },
    //Ice cream counter function
    getIceCreamCount: async function(obj) {
        return await $(`//div[@class="counter-value" and text()="${obj.toString()}"][1]`);
    },
};