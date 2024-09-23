var errorVal = document.getElementById('errorVal').value;

if (errorVal != ""){
    if (errorVal == "A Server Error has Occured !"){
        Swal.fire ({title : 'Error' , icon : "error" , text : errorVal});
    }

    else{
        Swal.fire ({
            title : "Success",
            text : errorVal,
            icon : "success",
            confirmButtonText : "Login Now"
          }).then((result) => {
            
          if (result.isConfirmed) {
            window.location.href = "/login";
          } 
        });;
    }
}