const billItems = [];

let To , LRNO , From , VehicleNO ,VehicleType , Destination ,BillNo = 0 ;
let Fright = 0 , ExtraPermission = 0 , Advance = 0 , Total=0;

function totalCost(){
    
    if( document.getElementById('Fright').value.length != 0){
        Fright= parseInt(document.getElementById('Fright').value);
    }
    else{
        document.getElementById('Fright').value=0;   
    }
    if( document.getElementById('ExtraPermission').value.length != 0){
        ExtraPermission = parseInt(document.getElementById('ExtraPermission').value);
    }
    else{
        document.getElementById('ExtraPermission').value=0;   
    }
    if(document.getElementById('Advance').value.length != 0){ 
        Advance = parseInt(document.getElementById('Advance').value);
    }
    else{
        document.getElementById('Advance').value=0;   
    }
    let total = Fright+ExtraPermission-Advance 
    
    document.getElementById('total').value= total;

}

function Print(){
    window.print();

    document.getElementsByTagName('span').style.display='inline';
    document.getElementById('Copyright').style.display='block';
}

function billNo(){     
        async function fetchData() {
            try {
              const response = await fetch("https://script.google.com/macros/s/AKfycbyxd2HG3OwRYZTuYtFn_JbyKvt8YHy72Gezqwxp14GgFm7PrkBlLH5JJmyhOMDJ07ud/exec");
              const data = await response.json();
              if(data.data.length == 0 ){
               
                BillNo = 1;
              
              }else{
                BillNo = parseInt(data.data[data.data.length-1]["Bill No"])+1;
              }
              document.getElementById('BillNo').innerHTML = BillNo;
            } catch (error) {
              console.error(error);
            }
        }
        fetchData();
}

async function SubmitForm()
{
   
    //BillNo = document.getElementById("BillNo").value;
    DatE = document.getElementById("DatE").value;
    console.log(document.getElementById("DatE").value);
    To =document.getElementById("To").value;
    LRNO=document.getElementById("LRNO").value;
    From=document.getElementById("From").value;
    Destination=document.getElementById("Destination").value;
    VehicleNO = document.getElementById("VehicleNO").value;
    Fright= document.getElementById("Fright").value;
    ExtraPermission=document.getElementById("ExtraPermission").value;
    Advance=document.getElementById("Advance").value;
    Total=document.getElementById("total").value;
    VehicleType=document.getElementById("VehicleType").value;
    Status=0;
    const data = {"To":To,"LoadingDate":DatE,"From":From,"Total":Total,"Fright":Fright,"Status":0,"Advance":Advance,"Bill No":BillNo,"LR Number":LRNO,"Destination":Destination,"Extra Charges":ExtraPermission,"Vehicle Number":VehicleNO.toUpperCase(), "Vehicle Type":VehicleType.toUpperCase()};
    
    console.log(data);
    if(To.length==0 )
    {
        alert ("Please Enter Recipient Data...!");
        document.getElementById("To").focus();
    }else if (Fright.length==0){
        alert ("Please Enter Fright Amount...!");
        document.getElementById("Fright").focus();
    }else if(Total.length==0){
        alert("Please calculate total Amount . For that Press on total text.");
        document.getElementById("total").focus();
    }
    else{
        document.getElementById("Submit").disabled = true;
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbx4vR8nOmHB9rGJtx9huSCu6o8iLp17A0Fj5xTWv-ZFpTxOk8AaLFAPMimI8rASl57t/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(data).toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Form submitted successfully!');
            location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }

        document.getElementById("Submit").disabled = false;
    }
        
    
}

function adjustHeight(el){
    el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "30px";
}


function search(){
    const viewbillNo = document.getElementById("BillNoViewReport").value;
    if (viewbillNo == ''){
        alert("Please Enter Bill No...! ");
        document.getElementById("BillNoViewReport").focus();
    }else
    {
        document.getElementById("viewBill").reset();
        console.log(document.getElementById("BillNoViewReport").value);
        
        fetchData();
   
    }
   

    async function fetchData() {
        document.getElementById("Searchbtn").disabled = true;
        try {

            const response = await fetch("https://script.google.com/macros/s/AKfycbyxd2HG3OwRYZTuYtFn_JbyKvt8YHy72Gezqwxp14GgFm7PrkBlLH5JJmyhOMDJ07ud/exec");
            let data = await response.json();
            data=data.data;
    
         

            let SearchData = data.find((data) => data["Bill No"]==document.getElementById("BillNoViewReport").value);

            if(SearchData == null){
              alert("Bill Is Not Generated");
              document.getElementById("BillNoViewReport").value="";
              document.getElementById("BillNoViewReport").focus();

            }else{
                document.getElementById("DatE").value = SearchData.Date;
                document.getElementById("To").value = SearchData.To;
                document.getElementById("LRNO").value = SearchData["LR Number"];           ;
                document.getElementById("From").value = SearchData.From;
                document.getElementById("Destination").value = SearchData.Destination;
                document.getElementById("VehicleNO").value = SearchData["Vehicle Number"];
                document.getElementById("Fright").value = SearchData.Fright;
                document.getElementById("ExtraPermission").value = SearchData["Extra Charges"];
                document.getElementById("Advance").value = SearchData.Advance;
                document.getElementById("total").value = SearchData.Total;
                document.getElementById("VehicleType").value = SearchData["Vehicle Type"];
            }

          
      

        } catch (error) {
          console.error(error);
        } 
        document.getElementById("Searchbtn").disabled = false;
    }
    
}
