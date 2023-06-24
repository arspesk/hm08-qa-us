const page = require('../../page');
const helper = require('../../helper')

// Test suite for full process of ordering taxi through Uber.Routes app
describe('Create an order', () => {

    // 1. Test for setting up address in "From" and "To" fields
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        expect(await $(page.tariffModal)).toBeExisting();
    })
    
    // 2. Test for selecting "Supportive" taxi plan
    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton)
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeEnabled();
    })

    // 3.1 Test for opening phone number modal
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    // 3.2 Test for filling in and saving phone number for an order
    it('should fill in and save the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    // 4. Test for adding a credit card
    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const cardNumber = helper.getCreditCardNumber();
        const cvvCode = helper.getCVVCode();
        await page.addCreditCard(cardNumber, cvvCode);
        //Checking if card is added (since its bugged and not displaying 4 last digits, we'll just use its name "Card" :))
        await expect(await helper.getElementByText("Card")).toBeExisting();
    })
    
    // 5. Test for writing a message for the driver
    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageForDriverField = await $(page.messageForDriverField);
        await messageForDriverField.waitForDisplayed();
        const driverMessageInput = await $(page.driverMessageField);
        await driverMessageInput.setValue("Hello, driver!");
        const displayedMessage = await driverMessageInput.getValue();
        await expect(displayedMessage).toBe("Hello, driver!");
    })
    // 6. Ordering a Blanket and handkerchiefs with a taxi
    it('should order a Blanket and handkerchiefs with a taxi', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton)
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click()
        const blanketAndHandkerchiefsButton = await $(page.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        await blanketAndHandkerchiefsButton.click();
        await expect(blanketAndHandkerchiefsButton).toBeEnabled();
    })
    // 7. Ordering 2 Ice creams with a taxi
    it('should order 2 Ice creams with a taxi', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton)
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click()
        const iceCreamsButton = await $(page.iceCreamButton);
        await iceCreamsButton.waitForDisplayed();
        await iceCreamsButton.click();
        await iceCreamsButton.click();
        browser.pause(3000);
        await expect(await helper.getIceCreamCount("2")).toBeExisting();
    })
    // 8. The car search modal appears
    it('should open the car search modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const businessPlanButton = await $(page.businessPlanButton);
        await businessPlanButton.waitForDisplayed();
        await businessPlanButton.click();
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const orderModal = await $(page.carSearchModal);
        await orderModal.waitForDisplayed();
        await expect(orderModal).toBeExisting();
    })
    // 9. Waiting for the driver info to appear in the modal
    it('should dislpay driver info in the modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const businessPlanButton = await $(page.businessPlanButton);
        await businessPlanButton.waitForDisplayed();
        await businessPlanButton.click();
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const orderModal = await $(page.carSearchModal);
        await orderModal.waitForDisplayed();
        // We will set a browser pause to make sure that driver info will appear when the timer is over
        browser.pause(50000);
        const orderNumber = await $(page.orderNumber);
        await orderNumber.waitForDisplayed();
        await expect(orderNumber).toBeExisting();
        // I've changed tariff to Business, but test is still failing, according to the logs timeout happens after 10000ms, not 50000ms as I set,not sure if it is a problem with browser.pause() or something else or something else :\
    })  
})

