const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const VendorsController = require('./controllers/VendorsController')
const ItemsController = require('./controllers/ItemsController')
const AssaysController = require('./controllers/AssaysController')
const OrdersController = require('./controllers/OrdersController')
const DepartmentController = require('./controllers/DepartmentController')
const EntryController = require('./controllers/EntryController')
const isAuthenticated = require('./policies/isAuthenticated')
// define placement of authentication
// to do: decide where to place authentication

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/user-login', AuthenticationController.userLogin)
  app.post('/login', AuthenticationController.login)
  app.post('/userupdate', isAuthenticated, AuthenticationController.update)
  app.post('/sessioncheck', isAuthenticated, AuthenticationController.checkSession)
  app.get('/get-users', isAuthenticated, AuthenticationController.getUsers)

  app.get('/departments', DepartmentController.index)
  app.post('/departments', DepartmentController.post)
  app.put('/departments/:deptId', isAuthenticated, DepartmentController.put)

  app.get('/vendors', isAuthenticated, VendorsController.index)
  app.get('/vendors/:vendorId', VendorsController.show)
  app.post('/vendors', isAuthenticated, VendorsController.post)
  app.put('/vendors/:vendorId', isAuthenticated, VendorsController.put)

  app.get('/items', isAuthenticated, ItemsController.index)
  app.get('/items/list', ItemsController.show)
  app.post('/items', isAuthenticated, ItemsController.post)
  app.put('/items/:itemId', isAuthenticated, ItemsController.put)
  app.put('/deactivate-items', isAuthenticated, ItemsController.deactivate)
  app.put('/reassign-items', isAuthenticated, ItemsController.reassign)

  app.get('/assays', isAuthenticated, AssaysController.index)
  app.get('/assays/:assayId', AssaysController.show)
  app.post('/assays', isAuthenticated, AssaysController.post)
  app.put('/assays/:assayId', isAuthenticated, AssaysController.put)

  app.get('/orders', isAuthenticated, OrdersController.index)
  app.get('/orders/:orderId', OrdersController.show)
  app.post('/orders', isAuthenticated, OrdersController.post)
  app.put('/orders/:orderId', isAuthenticated, OrdersController.put)
  app.delete('/orders/:orderId', OrdersController.remove)

  app.get('/entries', EntryController.index)
  app.get('/entries/:entryId', EntryController.show)
  app.post('/entries', EntryController.post)
  app.put('/entries', EntryController.put)
  app.delete('/entries', EntryController.remove)
}
