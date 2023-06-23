# Sprint 8 Project 

1.  WDIO.CONF.JS, TEST ENVIROMENTS AND URL
    
In order to run tests sucessfully, make sure you have a valid 'Urban.Routes' url link, make sure to update it before running the tests in wdio.conf.js.

For all tests we used 2 test enviroments: Google Chrome and Mozilla Firefox.

2.  HELPER.JS AND PAGE.JS EXPORT MODULE FILES

In order to simplyfy our tests we used helper.js file with some functions assigned there, specifcly for generating phone and credit card numbers.

Page.js in other hand has been used mainly to store our web page selectors, multiple methods has been used for selectors location: xPath, CSS and native wdio's "selecting element by text" method.

Page.js also contains:

  1) fillAddresses fanction: For filling the addresses in "From" and "To" fields.
  2) fillPhoneNumber fanction: For filling a random phone number into the field.
  3) submitPhoneNumber: For retrieving a phone number confirmation code and linking the phone number to the order.

3. VARIABLE NAMES

For the attcahed code we use a "camelCase" priciple for nameing variables for the api tests:

In the code 'let' used specificly for variables which could be changed during the coding and 'const' for a permanent fanctions, which unlikely to be changed.

4. COMMENTS

Every specific test has assigned name to it and description witten in comments.

There is also additional comments for test cases 8 and 9, cause they are resulting in error in each of the test enviroments. Please, can you provide me with a feedback of what I could did wrong there. I would highly appreciate it :). Thank you!

5. HOW TO RUN TESTS THROUGH TERMINAL?

In order to run tetsts through the terminal, please use "npm run wdio" command, each test will result in its own section with an assigned ststus "Sucess" or "Failure".
