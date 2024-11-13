const resetDatabase = async (request) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users',{
        data:{
            name: 'user',
            username:'user',
            password:'123456'
        }
    })
    await request.post('/api/users',{
        data:{
            name: 'testing user',
            username:'testing user',
            password:'testing'
        }
    })}

const login = async (page, username,password) => {
        await page.getByTestId('username').fill(username)
        await page.getByTestId('password').fill(password)
        await page.getByRole('button',{name:'Login'}).click()
    }
const createBlog = async (page, title, author, url) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill(title)
        await page.getByTestId('author').fill(author)
        await page.getByTestId('url').fill(url)
        await page.getByRole('button', { name: 'Create' }).click()
      
        await page.getByText(`${title} Author: ${author}`).waitFor()
      }
const likeTimes = async (page, button, n) => {
        for (let i = 0; i<n; i++) {
          await button.click()
          await page.getByText(`Likes: ${i+1}`).waitFor()
        }
      }

      module.exports = { resetDatabase, login, createBlog, likeTimes }
