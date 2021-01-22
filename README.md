# UI challenge

This challenge finality is to build a system that should be able, given a hypothetical API call that will retrieve an array of products data, let the user pack those products.

Some of the functional requirements of the system should be the following ones:

- You should start by rendering all unpacked items at the left of a split view. Please mock an async call to an API to retrieve the "Hypothetical API call\*\* shown below
- In the right section, you should view the packaged items, organised in packages.
- you should be able to create new packages and also to remove an empty package
- you can create multiple packages and pack items inside those packages
- You can pack one item into the currently selected package by clicking on its row
- You also can pack by receiving a barcode scan (very fast keyboard input sequence) with the item's SKU
- When an item is packed you can change it's quantities, by adding more items or removing (unpacking)
- Please add a minimum of two good automated tests to your code (yarn test)- When all items are packed, please add a "Ship" button. When the user click that button, please print a json that you would send to a server to write the information about what is being shipped. We need to know what items from what locations are in each packages.

You can refactor, redesign the UI or rewrite anything you want to show us the way you like to code, do html, style. Please use react and nextjs.

MAKE THE CODE AS SIMPLE AND READABLE AS YOU CAN

**Hypothetical API call**

```cmd
[
 {
   id: 1,
   quantity: 5,
   sku: "green-ball",
   location: "a1"
 },
 {
   id: 2,
   quantity: 6,
   sku: "red-ball",
   location: "a2"
 },
 {
   id: 3,
   quantity: 3,
   sku: "umbrella",
   location: "a3"
 },
 {
   id: 99,
   quantity: 2,
   sku: “green-ball”,
   location: “a4"
 }
]
```

## Available built-in commands

**Run the dev mode**

```cmd
yarn dev
```

**Build the Nextjs app**

```cmd
yarn build
```

**Run the dev builded mode**

```cmd
yarn start
```

**Run the tests**
Coverage report will be available under .coverage folder

```cmd
yarn test
```
