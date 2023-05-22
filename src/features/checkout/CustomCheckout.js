import "./customCheckout.css";
import { useEffect, useState,useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createProfile,makePayment } from "./BamboraSlice";
import { resetCart } from "../Products/productsSlice"; 
export const CustomCheckout = ({billing,orderTotal}) => {
  const dispatch = useDispatch();
  const countInputClick=useRef(0);
  const [token,setToken]=useState(null);
  // const profileStatus=useSelector(state=>state.bambora.profileStatus)
  // const paymentStatus=useSelector(state=>state.bambora.paymentStatus)
  useEffect(() => {
    //
    const customCheckoutFunc = function () {
      var customCheckout = window.customcheckout();

      var isCardNumberComplete = false;
      var isCVVComplete = false;
      var isExpiryComplete = false;
      var customCheckoutController = {
        init: function () {
          window.count++;
          console.log("checkout.init()");
          this.createInputs();
          this.addListeners();
        },
        createInputs: function () {
          console.log("checkout.createInputs()");
          var options = {};

          // Create and mount the inputs
          options.placeholder = "Card number";
          customCheckout.create("card-number", options).mount("#card-number");

          options.placeholder = "CVV";
          customCheckout.create("cvv", options).mount("#card-cvv");

          options.placeholder = "MM / YY";
          customCheckout.create("expiry", options).mount("#card-expiry");
        },
        addListeners: function () {
          var self = this;

          // listen for submit button
          if (document.getElementById("checkout-form") !== null) {
            document
              .getElementById("checkout-form")
              .addEventListener("submit", self.onSubmit.bind(self));
          }

          customCheckout.on("brand", function (event) {
            console.log("brand: " + JSON.stringify(event));

            var cardLogo = "none";
            if (event.brand && event.brand !== "unknown") {
              var filePath =
                "https://cdn.na.bambora.com/downloads/images/cards/" +
                event.brand +
                ".svg";
              cardLogo = "url(" + filePath + ")";
            }
            document.getElementById("card-number").style.backgroundImage =
              cardLogo;
          });

          customCheckout.on("blur", function (event) {
            console.log("blur: " + JSON.stringify(event));
          });

          customCheckout.on("focus", function (event) {
            console.log("focus: " + JSON.stringify(event));
          });

          customCheckout.on("empty", function (event) {
            console.log("empty: " + JSON.stringify(event));

            if (event.empty) {
              if (event.field === "card-number") {
                isCardNumberComplete = false;
              } else if (event.field === "cvv") {
                isCVVComplete = false;
              } else if (event.field === "expiry") {
                isExpiryComplete = false;
              }
              self.setPayButton(false);
            }
          });

          customCheckout.on("complete", function (event) {
            console.log("complete: " + JSON.stringify(event));

            if (event.field === "card-number") {
              isCardNumberComplete = true;
              self.hideErrorForId("card-number");
            } else if (event.field === "cvv") {
              isCVVComplete = true;
              self.hideErrorForId("card-cvv");
            } else if (event.field === "expiry") {
              isExpiryComplete = true;
              self.hideErrorForId("card-expiry");
            }

            self.setPayButton(
              isCardNumberComplete && isCVVComplete && isExpiryComplete
            );
          });

          customCheckout.on("error", function (event) {
            console.log("error: " + JSON.stringify(event));

            if (event.field === "card-number") {
              isCardNumberComplete = false;
              self.showErrorForId("card-number", event.message);
            } else if (event.field === "cvv") {
              isCVVComplete = false;
              self.showErrorForId("card-cvv", event.message);
            } else if (event.field === "expiry") {
              isExpiryComplete = false;
              self.showErrorForId("card-expiry", event.message);
            }
            self.setPayButton(false);
          });
        },
        onSubmit: function (event) {
          var self = this;
          console.log("checkout.onSubmit()");

          event.preventDefault();
          self.setPayButton(false);
          self.toggleProcessingScreen();

          var callback = function (result) {
            console.log("token result : " + JSON.stringify(result));

            if (result.error) {
              self.processTokenError(result.error);
            } else {
              self.processTokenSuccess(result.token);
            }
          };

          console.log("checkout.createToken()");
          customCheckout.createToken(callback);
        },
        hideErrorForId: function (id) {
          console.log("hideErrorForId: " + id);

          var element = document.getElementById(id);

          if (element !== null) {
            var errorElement = document.getElementById(id + "-error");
            if (errorElement !== null) {
              errorElement.innerHTML = "";
            }

            var bootStrapParent = document.getElementById(id + "-bootstrap");
            if (bootStrapParent !== null) {
              bootStrapParent.className = "form-group has-feedback has-success";
            }
          } else {
            console.log("showErrorForId: Could not find " + id);
          }
        },
        showErrorForId: function (id, message) {
          console.log("showErrorForId: " + id + " " + message);

          var element = document.getElementById(id);

          if (element !== null) {
            var errorElement = document.getElementById(id + "-error");
            if (errorElement !== null) {
              errorElement.innerHTML = message;
            }

            var bootStrapParent = document.getElementById(id + "-bootstrap");
            if (bootStrapParent !== null) {
              bootStrapParent.className = "form-group has-feedback has-error ";
            }
          } else {
            console.log("showErrorForId: Could not find " + id);
          }
        },
        setPayButton: function (enabled) {
          console.log("checkout.setPayButton() disabled: " + !enabled);

          var payButton = document.getElementById("pay-button");
          if (enabled) {
            payButton.disabled = false;
            payButton.className = "btn btn-primary";
          } else {
            payButton.disabled = true;
            payButton.className = "btn btn-primary disabled";
          }
        },
        toggleProcessingScreen: function () {
          var processingScreen = document.getElementById("processing-screen");
          if (processingScreen) {
            processingScreen.classList.toggle("visible");
          }
        },
        showErrorFeedback: function (message) {
          var xMark = "\u2718";
          this.feedback = document.getElementById("feedback");
          this.feedback.innerHTML = xMark + " " + message;
          this.feedback.classList.add("error");
        },
        showSuccessFeedback: function (message) {
          var checkMark = "\u2714";
          this.feedback = document.getElementById("feedback");
          this.feedback.innerHTML = checkMark + " " + message;
          this.feedback.classList.add("success");
        },
        processTokenError: function (error) {
          error = JSON.stringify(error, undefined, 2);
          console.log("processTokenError: " + error);

          this.showErrorFeedback(
            "Error creating token: </br>" + JSON.stringify(error, null, 4)
          );
          this.setPayButton(true);
          this.toggleProcessingScreen();
        },
        processTokenSuccess: function (token) {
          console.log("processTokenSuccess: " + token);

          this.showSuccessFeedback("Success! Created token: " + token);
          this.setPayButton(true);
          this.toggleProcessingScreen();

          // Use token to call payments api
          // this.makeTokenPayment(token);
          setToken(token);
        },
      };

      customCheckoutController.init();
    };
    if(window.count===0){
      customCheckoutFunc();
    }
    //
  }, []);

  
  useEffect(()=>{
    if(token){
      console.log(countInputClick.current);
      if(countInputClick.current===0){
        dispatch(createProfile({token,billing}));
        toast.success('Card profile saved successfully',{ autoClose: 2000 ,position: "bottom-right",theme: "dark"});
      }else if(countInputClick.current===1){
        dispatch(makePayment({token,billing,amount:Number(orderTotal)}));
        dispatch(resetCart());
        toast.success('Payment done successfully',{ autoClose: 2000 ,position: "bottom-right",theme: "dark"});
      }
      
      countInputClick.current++;
    }
  },[token,billing,orderTotal,dispatch]);


  return (
    <>
      <div className="container">
        <form id="checkout-form" >
          <div id="card-number"></div>
          <label htmlFor="card-number" id="card-number-error"></label>

          <div id="card-cvv"></div>
          <label htmlFor="card-cvv" id="card-cvv-error"></label>

          <div id="card-expiry"></div>
          <label htmlFor="card-expiry" id="card-expiry-error"></label>

          <input
            id="pay-button"
            type="submit"
            className="btn disabled"
            value={token?"Pay":"Save"}
            disabled={true}
           
          />
         

          <div id="feedback"></div>
        </form>
      </div>
      
    </>
  );
};
