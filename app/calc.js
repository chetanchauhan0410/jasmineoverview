var exports=module.exports={};

exports.myEmail='chetan.chauhan@globallogic.com';
exports.randomDecimalValue=12.32;

exports.incrementRandomDecimalValue=function(delta)
{
 exports.randomDecimalValue+=delta;
 //console.log(this.randomDecimalValue);
}

exports.sampleValue=null;

exports.getRandom=function(min,max)
{
 return Math.floor(Math.random() * (max-min))+min;
}

exports.add=function(a,b)
{
 return a+b;
};

exports.subtract=function(a,b)
{
 return a-b;
};

exports.multiply=function(a,b)
{
 return a*b;
};

exports.divide=function(a,b)
{
 if(b<=0)
 {
  throw new Error();
 }
 return a/b;
};

exports.checkEven=function(a)
{
 console.log("checkEven Called");
 if(a%2==0)
 {
  return true;
 }
 else
 {
  return false;
 }	 	
}

exports.singleDigitOdd=function()
{
 return [1,3,5,7,9];
}