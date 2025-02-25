OTP_STORAGE = {};
function GenerateOTP(id  ) { 

    const OTP = Math.floor(Math.random() * 90000) + 10000;
    StoreOTPAndCleanUp(OTP , id );
    
    return OTP;
}

function StoreOTPAndCleanUp(OTP  , id  , defaultExpTime = 60000) { 
    
    OTP_STORAGE[id] = { 
        OTP : OTP  , 
        expirationTime : Date.now()  + defaultExpTime 
    
    };


}

const id = "12313";

const otp  = GenerateOTP(id);

Object.entries(OTP_STORAGE).map(([key , value]) => {
     
    if(key == "12313") {
        console.log("exists");
    }

})