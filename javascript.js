const inputBox = document.querySelectorAll('.input-boxes .currency-box');
const outputBox = document.querySelectorAll('.output-boxes .currency-box');


const currencyGet=async(input,output)=>{
    const response=await fetch(`https://api.exchangerate.host/latest?base=${input}&symbols=${output}`)
    const data=response.json();
    return data.then(data=>console.log(data.rates.EUR))
  }


  function currencyValue(){
    inputBox.forEach(item=>{
        if(item.classList.contains('currency-box-active')){
            let data1=item.innerHTML
        
        outputBox.forEach(item=>{
            if(item.classList.contains('currency-box-active')){
                let data2=item.innerHTML

              
            currencyGet(data1,'EUR')

        }
    }
    )}
    })}
    currencyValue()
 
    
    

    inputBox.forEach(element => {
        element.addEventListener('click', e => {
          inputBox.forEach(el => el.classList.remove('currency-box-active'));
          e.target.classList.add('currency-box-active'); 
        currencyValue()
         
        });
      });
      
      outputBox.forEach(element => {
          element.addEventListener('click', e => {
              outputBox.forEach(el => el.classList.remove('currency-box-active'));
              e.target.classList.add('currency-box-active');    
          });
        });
