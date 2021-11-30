const usersRoutes = require('./users');
const walletRoutes = require('./wallet');
const scheduleRoutes = require('./schedule_payments');
const budgetRoutes = require('./budget');
const transactionRoutes = require('./transaction');
const categoryRoutes = require('./category');
const currencyRoutes = require('./currency');

const constructorMethod = (app) => {
    app.use('/', usersRoutes);
    app.use('/', walletRoutes);
    app.use('/', scheduleRoutes);
    app.use('/', budgetRoutes);
    app.use('/', transactionRoutes);
    app.use('/', categoryRoutes);
    app.use('/', currencyRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
  
//   router.get('/',async(req,res)=>{
    
//     try {
//       console.log("hi")
//        await user.create("2","2","2","2")
//       res.send("ok");
//     } catch (e) {
//       res.status(500).json({ error: e });
//     }
//   })
//   app.use('*', (req, res) => {
//     console.log("hi")
//     user.create("2","2","2","2")
//     res.sendStatus(404);
//   });

};

module.exports = constructorMethod;
