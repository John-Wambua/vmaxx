
module.exports=(req,res,next)=>{
    //401 -Authorized
    //403 Forbidden

    if(!req.user.isAdmin) return res.status(403).send('Access denied...');
    next();
}