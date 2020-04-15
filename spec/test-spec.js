/* *imported request package to use for calling web api
   *imported calc.js file containing few methods and values to use as input in test cases.
*/
var request = require("request");
var calc=require("../app/calc.js");

/* *This outermost describe block is our main test suite
   *It consists of two parameters first one is string containing its desc and second is a callback function 
    containing its logic, specs or other suit blocks. */
describe("Jasmine dummy app test", function() {
  
  beforeAll(function(){
	  calc.incrementRandomDecimalValue(1);
  });
  
  afterEach(function(){
	  calc.incrementRandomDecimalValue(1);
  });
  
  /* *Test suite block 1.
     *This is testing a http GET web service works and we are using a open source sample api reqres.in.
  */
  describe("Web Req check", function() {
    /* *A block begining with "it" is a test case or spec.
       *a spec is said to be successfull if its all assertions(i.e. expect statements) are passed.
    */  
    it("Checks if sample api is online", function() {
      
      request.get("https://reqres.in/api/users/2", function(error, response, body) {

        expect(response.statusCode).toBe(200);
        //it expects status code to be '200'
      });
    });
  });

  
  /* *Test suite block 2
     *This block consists of testcases implementing custom matcher,equality,boolean,sequential,null and NaN checks.
     *Adding a 'x' to a 'describe' or 'it' block tells jasmine to ignore its execution and then those specs will be
      shown in pending specs.
     *For test cases we are using methods defined in calc.js file which is imported above.
  */
  xdescribe("check operations",function(){
    /* *Logic described in callback function of beforeEach is executed once before every spec
       *We should always define custom matchers in beforeEach block.
    */
	   beforeEach(function() { 
      /* *Below is the example of custom matcher(i.e. validateNumber).*/ 
      jasmine.addMatchers ({ 
         validateNumber: function() { 
            return {    
               compare: function(actual,expected) {
                  var result = {}; 
                  result.pass = (actual >= 10 && actual <= 100);
                  result.message = 'not a double digit number';
                  return result; 
               }   
            };   
         }    
      });    
   }); 
	  /* Below is a spec using our custom matcher validateNumber */
	   it('Lets see whether its a 2 digit number', function() { 
		     var myNumber=14; 
		     expect(myNumber).validateNumber();         
      });
    
    /* Below two specs are using equality checks i.e. toEqual and toBe */
	   it("test addition",function(){
		     expect(calc.add(14,15)).toEqual(29);
         expect(calc.add(12,21)).not.toBe(34);		 
	  });
     
      it("test division",function(){
		      expect(calc.divide(49,7)).toEqual(7); 
      });

    /* Below spec is using boolean checks i.e. toBeTruthy and toBeFalsy */  
      it("test iseven method",function(){
		      expect(calc.checkEven(6)).toBeTruthy();
          expect(calc.checkEven(5)).toBeFalsy();		 
	  });
     
    /* Below 3 specs are using sequential checks i.e. toContain, toBeCloseTo and toMatch */
      it("test odd return function", function(){
		     expect(calc.singleDigitOdd()).toContain(9);
	  });
      
      it("testing close value", function () { 
         expect(calc.randomDecimalValue).toBeCloseTo(12.327,1);    
      });

      it("testing containing domain name", function () { 
         expect(calc.myEmail).toMatch(/globallogic/);    
      });
      
	   /* Below spec is using null checks toBeUndefined, toBeDefined and toBeNull */
      it("testing containing domain name", function () { 
		  expect(calc.mail).toBeUndefined();
		  expect(calc.myEmail).toBeDefined();
		  expect(calc.sampleValue).toBeNull();	  
      });
      
	   /* Below spec is using inequality checks i.e. toBeGreaterThan and toBeLessThan */
      it("test inequality assertions",function(){
		  expect(calc.getRandom(10,100)).toBeGreaterThan(10);
		  expect(calc.getRandom(10,100)).toBeLessThan(100);
	  });
	  
	  /* Below spec is using not a number or NaN check i.e. toBeNaN*/
	  it("test if nan",function(){
		 expect(calc.multiply(1,'a')).toBeNaN(); 
	  });
	  
    /* *Below spec is using any or anything checks
       * Any check is passed if value received in expect is of given type in any like for numbertoEqual(jasmine.any(Number))
       * Anything check is pass for any value except null and undefined
    */
	  it("test any and anything",function(){
		 //expect(calc.divide(5,0)).toThrow(Error);
     expect(calc.add(6,0)).toEqual(jasmine.any(Number));
     expect(calc.add('a',0)).toEqual(jasmine.anything());
	  });
  });

  
  /* *Test suite Block 3
     *This block contains test cases using spyon and related methods like returvalues,callThrough and callFake
     *"spyOn" creates a spy for an actual method and helps in accessing details to that methods call without actually calling it.
     *asscociating "and.returnvalue" with spyOn helps in returning a given fake value on calling that method.
     *on associating "and.callthrough" it will also call actual method as well as spy it.
     *on associating "and.callFake" allows us to give a fake implementation for spy method.
   */
  xdescribe("check spyOn and related matchers",function(){
	 beforeEach(function(){
		  //spyOn(calc,'incrementRandomDecimalValue').and.returnValue(15);
      //calc.incrementRandomDecimalValue(1); 
      
      spyOn(calc,'incrementRandomDecimalValue').and.returnValues(15,16,17);
      calc.incrementRandomDecimalValue(1);
      
      //spyOn(calc,'checkEven').and.callThrough();
      //calc.checkEven(6);
      
      spyOn(calc,'checkEven').and.callFake(function(num){
        if(num%2==0)
        {
         return 1;
        }
        else
        {
         return 0;
        }
      });
      //calc.checkEven(6);
      });
   
    /* toHaveBeenCalled in below spec is used to test if a spy method has been called or not */
	 it("test spy call",function(){
		expect(calc.incrementRandomDecimalValue).toHaveBeenCalled();
	 });
   
   /* toHaveBeenCalledTimes in below spec is used to test no. times a spy method has been called */
	 it("test number of calls",function(){
		 expect(calc.incrementRandomDecimalValue).toHaveBeenCalledTimes(1);
	 });
   
   /* toHaveBeenCalledTimes in below spec is used to test if spy method has been called with given argument */
	 it("test arguments",function(){
		 expect(calc.incrementRandomDecimalValue).toHaveBeenCalledWith(1);
   });

   it("test returnValue",function(){
     expect(calc.incrementRandomDecimalValue(1)).toBe(16);
     expect(calc.incrementRandomDecimalValue(1)).toBe(17);
   });

   it("test fake call",function(){
     expect(calc.checkEven(6)).toBe(1);
   });

   /* after callthrough if you use "and.stub" on a spy method its actual implementation is not executed anymore */
   it("check stub",function(){
     calc.checkEven.and.stub();
     expect(calc.checkEven(6)).toBe(0);
   });
	 
  });


  /* *Test suite Block 4
     *In this block we are using createSpy to manually create a spy method which do not have an actual method.
     * 
   */
  xdescribe("check manually creating spy by createSpy and related methods",function(){
     var spyMethod;
     beforeEach(function(){
       spyMethod=jasmine.createSpy('spyMethod');
       spyMethod("Will","Smith",101);
     });

     it("test that the spy method was called", function() {
      expect(spyMethod).toHaveBeenCalled();
    });
    
    /* spyMethod.calls.mostRecent() will return details of most recent call to spy method */
    it("allows access to the most recent call", function() {
      expect(spyMethod.calls.mostRecent().args[0]).toEqual("Will");
    });

    it("test number of calls", function() {
      expect(spyMethod.calls.count()).toEqual(1);
    });

    it("test args of its calls", function() {
      expect(spyMethod).toHaveBeenCalledWith("Will","Smith",101);
    });
  
  });

   /* *Test suite Block 5
      *In this block we are using createSpyObj to create an object containing newly created multiple spy methods( in beforeEach method).
   */
  xdescribe("creating multiple spies using createSpyObj",function(){
     var spyOrg;

     beforeEach(function() {
     spyOrg=jasmine.createSpyObj('spyOrg',['getSpyDetails','getSpyCode','getSpyCount']);
     spyOrg.getSpyDetails("id");
     spyOrg.getSpyCode();
     spyOrg.getSpyCount();
     });
     
     it("test if spymethods were defined", function() {
      expect(spyOrg.getSpyDetails).toBeDefined();
      expect(spyOrg.getSpyCode).toBeDefined();
      expect(spyOrg.getSpyCount).toBeDefined();
    });

    it("test spies were called", function() {
      expect(spyOrg.getSpyDetails).toHaveBeenCalled();
      expect(spyOrg.getSpyCode).toHaveBeenCalled();
      expect(spyOrg.getSpyCount).toHaveBeenCalled();
    });

    it("test arguments of a spymethod",function(){
      expect(spyOrg.getSpyDetails).toHaveBeenCalledWith("id");
    });
     
  });
  
   /* *Test suite Block 6
      *In this block we are using checks in spec for partial matching in an array,object and string i.e. arrayContaining,
       objectContaining and stringMatching.
   */
  describe("test partial match",function(){
    var spymethodArr=jasmine.createSpy('spymethodArr').and.returnValue([2,4,6,8]);
    var spymethodObj=jasmine.createSpy('spymethodObj').and.returnValue({id:1,name:'John Doe',code:101});

    it("test array partial match",function(){
      expect(spymethodArr()).toEqual(jasmine.arrayContaining([4,8]));
    });
    
    it("test object partial match", function(){
      expect(spymethodObj()).toEqual(jasmine.objectContaining({name:'John Doe'}));
    });

    it("test string partial match",function(){
      expect(spymethodObj().name).toEqual(jasmine.stringMatching('Doe'));
    });

  });
  
  /* *Test suite Block 7
     * In this block we are creating a custom asymmetrical tester which returns true if string in expect 
       contains value 'gurgaon'.
  */
  xdescribe("custom asymmetry tester",function(){
    var getInfoString=jasmine.createSpy('getInfoString').and.returnValue('Technopark;sec-34;gurgaon;haryana');
    
    var asymTester={
      asymmetricMatch: function(actual) {
        return actual.includes('gurgaon')
      }
     }

    /* this spec is passed only when custom tester will return truel */
    it("test string via asymmetric tester",function(){
       expect(getInfoString()).toEqual(asymTester);
    }) 
  });
  
  /* *Test suite Block 7
     *In this block we are handling promise and processing an assertion when promise has been fulfilled.
  */
  describe("check promises",function(){
      
      var value=null;
      /* This method will return a promise after 1 second. */
      var getInstantPromise=function()
      {
          return new Promise(function(resolve,reject){
            setTimeout(function(){
              resolve();
            },1000);
          });
      }

      beforeEach(function() {
        return getInstantPromise().then(function() {
          value = 0;
        });
      });
      
      it("should wait for promise resolve before executing expectation ", function() {
        return getInstantPromise().then(function() {
          value++;
          expect(value).toBeGreaterThan(0);
        });
      });

      /*it("test async/await", async function (){
        await getInstantPromise();
        value++;
        expect(value).toBe(1);
      });*/
  });
  
});

