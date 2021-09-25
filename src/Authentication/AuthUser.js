class AuthUser {
  

     dummyCall= (name,cb)=>{ console.log(name); cb()}

    isLoggedIn=()=>{ return (localStorage.getItem('isLoggedIn')==='true') }

     loginUser= (user,cb)=>{
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('u_id',user.u_id);
        localStorage.setItem('u_name',user.uname);
        localStorage.setItem('u_email',user.email);
        localStorage.setItem('u_token', Math.floor(user.uname+Math.random()*10000000000));
        localStorage.setItem('user_type',"USER");
        console.log(user.u_id,user.uname,user.email);
      
        cb();
    }
    loginAdmin= (cb)=>{
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('u_id',99999);
        localStorage.setItem('u_name','AMOL');
        localStorage.setItem('u_email','amolbhoi9@gmail.com');
        localStorage.setItem('u_token', 'amol123');
        localStorage.setItem('user_type',"ADMIN");

        cb()
    }

    logout= (cb)=>{ 
            if(this.isLoggedIn()){
                localStorage.clear();
                localStorage.setItem('isLoggedIn',false);
                localStorage.setItem('user_type','DEFALUT');
            }
            else
            console.log("ALREADY LOGGED Logged out"); 

        cb();
     }
}

export default new AuthUser()
