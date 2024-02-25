// Lägg till en anteckning och bekräfta att den visas på sidan:
const { test, expect } = require('@playwright/test');

test('Lägg till anteckning och kontrollera synlighet', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Lägg till en anteckning
  await page.fill('input#todo-input', 'Kolla bilder på söta röda pandor');
  await page.press('input#todo-input', 'Enter');

  // Bekräfta att anteckningen syns på sidan
  const newNote = await page.waitForSelector('.toDo-item');
  expect(newNote).toBeTruthy();
});


// Lägg till en anteckning och bekräfta att sidan visar "1 item left". Kryssa i anteckningen och bekräfta att sidan visar "0 items left":
test('Lägg till och kryssa i anteckning - kontrollera "items left"', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Lägg till en anteckning
  await page.fill('input#todo-input', 'Laga middag');
  await page.press('input#todo-input', 'Enter');

  // Bekräfta "1 item left"
  const itemsLeftBefore = await page.waitForSelector('.items-left');
  expect(await itemsLeftBefore.innerText()).toContain('1 item left');

  // Kryssa i anteckningen
  const checkbox = await page.waitForSelector('.editCheckbox');
  await checkbox.setChecked(true);

  // Bekräfta "0 items left"
  const itemsLeftAfter = await page.waitForSelector('.items-left');
  expect(await itemsLeftAfter.innerText()).toContain('0 items left');
});


// Lägg till 3 anteckningar, kryssa i en av dem och bekräfta att sidan visar "2 items left":
test('Lägg till 3 anteckningar - kryssa i en - kontrollera "items left"', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Lägg till 3 anteckningar + aktuell anteckningssiffra efteråt 
  for (let i = 1; i <= 3; i++) {
    await page.fill('#todo-input.todo-input', `Anteckning ${i}`);
    await page.press('#todo-input.todo-input', 'Enter');
  }

  // Kryssa i en av anteckningarna
  const checkbox = await page.waitForSelector('.toDo:nth-child(2)>input[type=checkbox]');
  await checkbox.setChecked(true);

  // Bekräfta "2 items left"
  const itemsLeft = await page.waitForSelector('.items-left');
  expect(await itemsLeft.innerText()).toContain('2 items left');
});
