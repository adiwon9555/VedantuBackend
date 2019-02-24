
var env=process.env.NODE_ENV || 'development';
if(env === 'test')
{
    //For aws
    process.env.PORT=80;
    //For local
//     process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/VShoppingTest'
}else if(env === 'development')
{
    rocess.env.PORT=80;
    //For local
//     process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/VShopping'
}
