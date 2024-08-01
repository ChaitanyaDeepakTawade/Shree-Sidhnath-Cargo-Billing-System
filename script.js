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
              BillNo = parseInt(data.data[data.data.length-1]["Bill No"])+1;
             
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
    const data = {"To":To,"Date":DatE,"From":From,"Total":Total,"Fright":Fright,"Status":0,"Advance":Advance,"Bill No":BillNo,"LR Number":LRNO,"Destination":Destination,"Extra Charges":ExtraPermission,"Vehicle Number":VehicleNO, "Vehicle Type":VehicleType};
    
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
    }
        
    
}

function adjustHeight(el){
    el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "30px";
}
