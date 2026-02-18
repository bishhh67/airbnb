//////////////////////////////////////////////////
//review validate code


<script>
function check(event) {
    event.preventDefault(); 

  let inputs = document.getElementsByTagName("textarea");
  let msgs = document.getElementsByClassName("msg");
   let isValid = true;


  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputs[i].className = "invalid";
      msgs[i].style.color = "red";
      msgs[i].innerText = "Invalid entry";
      msgs[i].style.display = "block";
      return false;
    } else {
      inputs[i].className = "valid";
      msgs[i].style.color = "green";
      msgs[i].innerText = "Valid entry";
      msgs[i].style.display = "block";
    }
  }



    event.target.submit();   // submit only if valid
 
}
</script>

/////////////////////////////////// 