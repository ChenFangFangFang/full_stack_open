const { describe, test, expect,beforeEach } = require('@playwright/test')

describe('Blog App', () => {
  beforeEach(async ({page,request}) => {
    await resetDatabase(request)
    await page.goto('')
  })

  test('login form is shown', async({page}) => {
    // await page.getByRole('button', { name: 'Login' }).click()
    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('user')
    // await textboxes[1].fill('123456')
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    })
    // describe('Login', () => {
    //   test('succeeds with correct credentials', async ({ page }) => {
    //     await page.getByTestId('username').fill('user')
    //     await page.getByTestId('password').fill('123456')
    //     await page.getByRole('button', { name: 'Login' }).click()
  
    //     await expect(page.getByText('User_fang logged in')).toBeVisible()
    //   })
  
    //   test('fails with wrong credentials', async ({ page }) => {
    //     await page.getByTestId('username').fill('mluukkai')
    //     await page.getByTestId('password').fill('wrong')
    //     await page.getByRole('button', { name: 'Login' }).click()
  
    //     await expect(page.getByText('Wrong credentials')).toBeVisible()
    //     await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    //   })
    // })
//  describe('When logged in', () => {
//   beforeEach(async ({page}) =>{
//     await page.getByTestId('username').fill('user')
//     await page.getByTestId('password').fill('123456')
//     await page.getByRole('button',{name:'Login'}).click()
//     await expect(page.getByText('user_fang logged in')).toBeVisible()
//   })
//   test('a new blog can be added', async({page}) => {
//     await page.getByRole('button', { name: 'create new blog' }).click()
//     await page.getByTestId('title').fill('testing blog')
//     await page.getByTestId('url').fill('URL of testing blog')
//     await page.getByTestId('author').fill('author of testing blog')
//     await page.getByRole('button',{name:'Create'}).click()
//     await expect(page.getByText('testing blog')).toBeVisible()
//   })
//  })
})
