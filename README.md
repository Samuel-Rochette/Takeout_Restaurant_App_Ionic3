# Takeout Restaurant App Ionic 3

This is an Ionic 3 application that I made to fetch and display data about menu items for a hypothetical restaurant, and to allow the user to place takeout and delivery food orders. The purpose of this program was improve my knowledge of the Ionic 3 framework.

### Features

* The store can be called from the home page using ionic cordova Call plugin
* Features a menu page which displays the name and price of the menu items as list items
* Items on menu have plus/minus buttons which allow the user to add or remove the item from their order
* Clicking on a menu item will navigate the user to an item detail page for that particular item. Features an item description, lets user add or remove item from their order, and allows the user to save the item to a list of favorite menu items.
* Swiping left on a list item on the menu reveals a button which allows the user to save that particular item to their list of favorites
* Swiping left or right inside the item detail page will navigate the user to the page for the previous/next item in the menu. The item detail page also features left/right arrow buttons which serve the same purpose
* Menu page list items can be filtered using a search bar or by sorting them by item tag (Meals, Drinks, Sides)
* Saved item page to view items saved as favorites. Has all the same features as the Menu page except swiping left on a list item reveals a delete button instead of a save button
* Checkout form with validation for submitting credit card details and other information to the back end. Includes the option to save inputs (credit card, address, email) for future orders.
* Review page displays the user's order including taxes and stripe processing fee before they choose to finalize the order

### Download and Deploy this project

1.  Download and extract the zip file for this project or download using git clone
2.  Install dependencies using `npm install`
3.  Build project for the platform you wish to use (android, ios, or windows phone) by using the command `ionic platform add <platform>`
4.  Run the application using `ionic cordova run <platform>`\*

\*requires a compatible mobile device or a mobile phone emulator
