#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"; 

console.log(chalk.yellow.italic.bold.underline('Welcome to ATM machine')); 

let myBalance = 45000; // Dollar
let myPinCode = 7070;

let pinCode = await inquirer.prompt([
    {
        name: 'pin',
        type: 'number',
        message:'Please enter your "PinCode"',
    }
]);

if (pinCode.pin === myPinCode) {
    console.log(chalk.green.italic.bold("You entered the correct pin code.")); 

    let operation = await inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'Please select an option',
            choices: ['withdraw', 'check balance', 'fast cash']
        }
    ]);

    if (operation.operation === 'withdraw') {
        let amountAnst = await inquirer.prompt([
            {
                type: 'number',
                name: 'amount',
                message: 'Enter your Amount here'
            }
        ]);
        if (amountAnst.amount > myBalance) {
            console.log(chalk.blue.italic.bold(`Sorry, you have insufficient balance. Your current balance is ${myBalance}`));
        } else {
            myBalance -= amountAnst.amount;
            console.log(chalk.red.italic.bold(`Your remaining balance is ${myBalance}`)); 
        }

    } else if (operation.operation === 'check balance') {
        console.log(chalk.yellow.italic.bold(`Your total balance is ${myBalance}`));

    } else if (operation.operation === 'fast cash') {
        let fastCash = await inquirer.prompt([
            {
                type: 'list',
                name: 'fast',
                message: 'Choose your amount',
                choices: [5000, 10000, 20000, 30000]
            }
        ]);
        if (fastCash.fast > myBalance) {
            console.log(chalk.magenta.italic.bold(`Your balance is insufficient. Your current balance is ${myBalance}`)); 

            myBalance -= fastCash.fast;
            console.log(chalk.cyan.italic.bold(`Your remaining balance is ${myBalance}`));
        }
    }
} else {
    console.log(chalk.red.italic.bold("You entered an invalid pin code"));
}
