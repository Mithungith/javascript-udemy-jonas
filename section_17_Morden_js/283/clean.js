//"use strict";
"strict mode";
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
/*
// can mutate deeper copy
budget[0].value=560;
console.log(budget);

// complete mutation not posible
budget[2] ="hello";
console.log(budget);
*/
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// The avove object is not mutated because of freeze
/*
spendingLimits.mithun = 200;
console.log(spendingLimits);
*/
const getLimits = (limits,user) => spendingLimits?.[user] ?? 0;

// Pure function
const addExpense = function (state,limits,value, description, user= 'jonas') {
  //user = user.toLowerCase(); // This type of data mutation should be avoid make new variable insted
  const cleanUser = user.toLowerCase();
  return value <= getLimits(limits,cleanUser)?[...state,{ value: -value, description: description, user: cleanUser }]:state;
  };

const newBudget1 = addExpense(budget, spendingLimits,10, 'Pizza 🍕');
// addExpense(budget, spendingLimits,10, 'Pizza 🍕');
const newBudget2 =addExpense(newBudget1, spendingLimits,100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits,200, 'Stuff', 'Jay');
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

// Pure function
const checkExpenses = (state,limits) =>
   state.map(entry=> 
    entry.value < -getLimits(entry.user)? {...entry,flag: "limit"}:entry
  );

const finalBudget = checkExpenses(newBudget3,spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state,bigLimit) {
  // let output = '';
  // for (const entry of budget) output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
  
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
  const bigExpenses =state
  .filter(entry=> entry.value <= -bigLimit)
  .map(entry=>entry.description.slice(-2))
  .join(" / ");
  // .reduce((str,cur)=> `${str} / ${cur.description.slice(-2)}`, "")
  console.log(bigExpenses);
};


logBigExpenses(finalBudget,500)