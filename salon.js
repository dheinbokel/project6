/**
 *   @author Heinbokel, Doug (dheinbokel@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 6 File I/O || created: 11.27.2017
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let customer = [], /*claimedCoupon = [],*/ transactions = [];
let choice, newNum;

/**
 *   @method
 *   @desc dispatch method for this project
 *   @returns (null)
 */
function main() {
    loadCustmers();
    loadTransaction();
    options();
        if(choice === 1) {
            addCustomer();
        }
        else if(choice === 2){
            addTransaction();
        }
        else if(choice === 3){
            displayCustomers();
        }
    writeTransaction();
    writeMaster();
}

main();

/**
 *   @method
 *   @desc sets choice to either 1,2, or 3
 *   @returns (null)
 */
function options() {
    choice = -1;
    while (choice !== 1 && choice !== 2 && choice !== 3) {
        choice = Number(PROMPT.question(
            `\tChoose an option:
        \t\t1) Add new customer
        \t\t2) Perform transaction
        \t\t3) Display customers
        \t\tYour choice: `));
    }
}

/**
 *   @method
 *   @desc gets the ID, service, and price for the transaction and then pushes it to the transaction array
 *   @returns (null)
 */
function addTransaction() {
    const ATTRIBUTES = 3, TRAN_ID = 0, SERVICE = 1, SER_PRICE = 2;
    let tranID, price;
    let type;
    let choose = Number(PROMPT.question(`\nWhich customer is performing this transaction? [Choose a customer ID]`));
    for (let i = 0; i < customer.length; i++) {
        if (customer[i] === choose) {
            for (let j = 0; j < ATTRIBUTES; j++) {
                if (j === TRAN_ID) {
                    tranID = choose;
                }
                else if (j === SERVICE) {
                    type = PROMPT.question(`\nWhat type of service? [For example, Hair cut]`);
                }
                else if (j === SER_PRICE) {
                    price = Number(PROMPT.question(`\nHow much did the service cost?`));
                }
            }
            transactions.push([tranID, type, price]);
        }
    }
}

/**
 *   @method
 *   @desc loads in customers information from master.csv and places information into the customer array
 *   @returns (null)
 */
function loadCustmers() {
    let customerFile = IO.readFileSync(`master.csv`, `utf8`);
    let lines = customerFile.toString().split(/\r?\n/);
    for(let i = 0; i < lines.length; i++){
        customer.push(lines[i].toString().split(/,/));
    }
}

/**
 *   @method
 *   @desc loads in customers information from transaction.csv and places information into the transactions array
 *   @returns (null)
 */
function loadTransaction() {
    let transactionFile = IO.readFileSync(`transaction.csv`, `utf8`);
    let lines = transactionFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        transactions.push(lines[i].toString().split(/,/));
    }
}

/**
 *   @method
 *   @desc displays the contents of the customer array
 *   @returns (null)
 */
function displayCustomers() {
    const ATTRIBUTES = 5;
    for (let i = 0; i < customer.length; i++) {
        for (let j = 0; j < ATTRIBUTES; j++) {
            console.log(customer[i][j]);
        }
        console.log(`\n`);
    }
}

/**
 *   @method
 *   @desc writes the contents of the transactions array into transactionX.csv then renames it to transaction.csv after unlinking the original
 *   @returns (null)
 */
function writeTransaction() {
    const ATTRIBUTES = 3;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i]) {
            for (let j = 0; j < ATTRIBUTES; j++) {
                if(j < ATTRIBUTES -1){
                    IO.appendFileSync(`transactionX.csv`, `${transactions[i][j]},`, `utf8`);
                }
                else if(i < transactions.length -1){
                    IO.appendFileSync(`transactionX.csv`, `${transactions[i][j]}\n`, `utf8`);
                }
                else{
                    IO.appendFileSync(`transactionX.csv`, `${transactions[i][j]}`, `utf8`);
                }
            }
        }
    }
    IO.unlinkSync(`transaction.csv`);
    IO.renameSync(`transactionX.csv`, `transaction.csv`);
}

/**
 *   @method
 *   @desc writes the contents of the customer array into masterX.csv then renames it to master.csv after unlinking the original
 *   @returns (null)
 */
function writeMaster() {
    const ATTRIBUTES = 5;
    for (let i = 0; i < customer.length; i++) {
        if (customer[i]) {
            for (let j = 0; j < ATTRIBUTES; j++) {
                if(j < ATTRIBUTES -1){
                    IO.appendFileSync(`masterX.csv`, `${customer[i][j]},`, `utf8`);
                }
                else if(i < customer.length -1){
                    IO.appendFileSync(`masterX.csv`, `${customer[i][j]}\n`, `utf8`);
                }
                else{
                    IO.appendFileSync(`masterX.csv`, `${customer[i][j]}`, `utf8`);
                }
            }
        }
    }
    IO.unlinkSync(`master.csv`);
    IO.renameSync(`masterX.csv`, `master.csv`);
}

/**
 *   @method
 *   @desc adds a new customer to the customer array
 *   @returns (null)
 */
function addCustomer() {
    newNum = customer.length;
    let custID, lName, fName, total, couponCheck;
    const ATTRIBUTES = 5, CUSTOMER_ID = 0, LAST_NAME = 1, FIRST_NAME = 2, TOTAL_AMOUNT = 3;
    for(let i = 0; i < ATTRIBUTES; i++){
        if(i === CUSTOMER_ID){
            custID = newNum;
        }
        else if(i === LAST_NAME){
            lName = (PROMPT.question(`\nWhat is the last name of the customer?`));
        }
        else if(i === FIRST_NAME){
            fName = (PROMPT.question(`\nWhat is the first name of the customer?`));
        }
        else if(i === TOTAL_AMOUNT){
            total = 0;
        }
        else{
            couponCheck = 0;
        }
    }
    customer.push([custID, lName, fName, total, couponCheck]);
}