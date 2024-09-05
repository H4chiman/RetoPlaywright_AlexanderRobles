
import {test, expect} from 'playwright/test'


test('Creacion personal', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button', {name:'Login'}).click()
    await page.getByRole('link', {name:'PIM'}).click()
    await page.getByRole('button', {name:' Add'}).click()

    const fileChooserPromise = page.waitForEvent('filechooser')
    await page.getByRole('button', { name: '' }).click()
    const fileChooser = await fileChooserPromise
    const specificFilePath = 'C:\\Users\\alexa\\Downloads\\FOTO ALEX.jpg';  // Reemplaza con tu ruta específica
    await fileChooser.setFiles(specificFilePath);
    await page.getByRole('textbox', {name:'First Name'}).fill('Paul')
    await page.getByRole('textbox', {name:'Middle Name'}).fill('Macca')
    await page.getByRole('textbox', {name:'Last Name'}).fill('Jones')
    await page.getByRole('button', {name:'Save'}).click()
    await page.waitForTimeout(3000)
    await page.getByRole('link', {name:'Employee List'}).click()
    
    const employeeName = 'Paul Macca';
    await page.waitForSelector('input[placeholder="Type for hints..."]');
    await page.fill('input[placeholder="Type for hints..."]', employeeName);
    await page.getByRole('button', {name:'Search'}).click()

    await page.waitForTimeout(4000)

    const tableContainer = await page.locator("xpath=//div[@class='oxd-table orangehrm-employee-list']")
    const rows = await tableContainer.locator("xpath=.//div[2]//div[3]")

    const rowTexts = await rows.evaluateAll((elements) =>
    
      elements.map(el => el.textContent?.trim())
    );

    console.log('Textos de las filas:', rowTexts);

    // Validar si el nombre del empleado está presente en alguna fila
    
    const employeeExists = rowTexts.some(text => text?.includes(employeeName));

    // Verificar que el nombre del empleado existe en la lista
  // Imprimir el resultado en el log
  if (employeeExists) {
    console.log(`El empleado '${employeeName}' ha sido creado correctamente y está presente en la lista de registros.`);
  } else {
    console.log(`El empleado '${employeeName}' NO ha sido creado correctamente y no está presente en la lista de registros.`);
  }

    expect(employeeExists).toBe(true);

  });
    /*console.log(rows.length)

    for(let row of rows){
        console.log(await row.innerText())
    }*/
 
 //extraer datos de la tabla
  
/*
  element container: //div[@class='oxd-table orangehrm-employee-list']//div[2]//div[3]
  .//div -> filas

  //div[@class='oxd-table orangehrm-employee-list']//div[2]//div[1] -- check
  //div[@class='oxd-table orangehrm-employee-list']//div[2]//div[2] -- id
  //div[@class='oxd-table orangehrm-employee-list']//div[2]//div[3] -- First (& Middle) Name

*/




