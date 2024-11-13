const { describe, test, expect,beforeEach } = require('@playwright/test')
const {resetDatabase, login, createBlog, likeTimes} = require('./helper')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
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
  describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('user')
        await page.getByTestId('password').fill('123456')
        await page.getByRole('button', { name: 'Login' }).click()
  
        await expect(page.getByText('user logged in')).toBeVisible()
      })
  
      test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'Login' }).click()
  
        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      })
    })
 describe('When logged in', () => {
  beforeEach(async ({page}) =>{
    await login(page, 'user', '123456')
  })
  test('a new blog can be added', async({page}) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByTestId('title').fill('testing blog')
    await page.getByTestId('url').fill('URL of testing blog')
    await page.getByTestId('author').fill('author of testing blog')
    await page.getByRole('button',{name:'Create'}).click()
    await expect(page.getByText('testing blog')).toBeVisible()
  })

  describe('and a blog exists', () => {
    beforeEach(async ({ page }) => {
      await createBlog(page, 'Testing with Playwright', 'Ted Tester', 'http//:example.com')
    })
    test('it can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('Likes: 1')).not.toBeVisible()
    })
    test('it can be deleted by the creator', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click()
      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'Delete' }).click()
      await page.waitForResponse((response) =>
        response.url().includes('/api/blogs') && response.status() === 200
      )
      await expect(page.getByText('Testing with Playwright Author: Ted Tester')).not.toBeVisible()
    })

    
  })
  describe('and multiple blogs exist', () => {
    beforeEach(async ({ page }) => {
      await createBlog(page, 'blog1', 'Ted Tester', 'http//:example.com/1')   
      await createBlog(page, 'blog2', 'Ted Tester', 'http//:example.com/2')
      await createBlog(page, 'blog3', 'Ted Tester', 'http//:example.com/3')
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await page.getByText('blog1').getByRole('button', { name: 'View'}).click()
      await page.getByText('blog2').getByRole('button', { name: 'View'}).click()
      await page.getByText('blog3').getByRole('button', { name: 'View'}).click()

      await page.pause()
      const button1 = page.getByText('blog1').getByRole('button', { name: 'Like'})
      await likeTimes(page, button1, 1)
      await page.getByText('blog1').getByRole('button', { name: 'Hide'}).click()

      let button2 = page.getByText('blog2').getByRole('button', { name: 'Like'})
      await likeTimes(page, button2, 3)
      await page.getByText('blog2').getByRole('button', { name: 'Hide'}).click()

      let button3 = page.getByText('blog3').getByRole('button', { name: 'Like'})
      await likeTimes(page, button3, 2)
      await page.getByText('blog3').getByRole('button', { name: 'Hide'}).click()

      const blogDivs = await page.locator('div.blog').all()

      expect(blogDivs[0]).toHaveText('blog2 by Ted Testerview') 
      expect(blogDivs[1]).toHaveText('blog3 by Ted Testerview') 
      expect(blogDivs[2]).toHaveText('blog1 by Ted Testerview') 
    })
  })

 })
})
