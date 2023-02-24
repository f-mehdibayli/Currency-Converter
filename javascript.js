const inputBox = document.querySelectorAll('.input-boxes .currency-box');
const outputBox = document.querySelectorAll('.output-boxes .currency-box');

const inputValue=document.querySelector('.input-value input')
const outputValue=document.querySelector('.output-value input')

const infoValue=document.querySelector('.input-value .currency-value')
const infoValue2=document.querySelector('.output-value .currency-value')

let abc;
const currencyGet=async(input,output)=>{
    const response=await fetch(`https://api.exchangerate.host/latest?base=${input}&symbols=${output}`)
    const data= response.json();
    data.then(data=> {
       
        const baseCurrency=input
        const targetCurrency=output 
        const resultValue=data.rates[targetCurrency]
        if(inputValue.value ===''){
            outputValue.value=''
        }else{
            const end=inputValue.value*resultValue
        outputValue.value=end
        }
        

        const info=`1 ${baseCurrency} = ${resultValue} ${targetCurrency}`
        infoValue.innerHTML=info
        
        const info1=`1 ${targetCurrency} = ${resultValue} ${baseCurrency}`
        infoValue2.innerHTML=info1
    }).catch(err=>console.log('Error:',err))
  }


  const currencyGet1=async(input,output)=>{
    const response=await fetch(`https://api.exchangerate.host/latest?base=${input}&symbols=${output}`)
    const data=response.json();
    data.then(data=> {

        const baseCurrency=input
        const targetCurrency=output
        const resultValue=data.rates[targetCurrency]
        if(outputValue.value?.trim() ===''){
            inputValue.value=''
        }else{ 
            const end=outputValue.value*resultValue
            inputValue.value=end
         }
       
        const info=`1 ${baseCurrency} = ${resultValue} ${targetCurrency}`
        infoValue2.innerHTML=info
         
        const info1=`1 ${targetCurrency} = ${resultValue} ${baseCurrency}`
        infoValue.innerHTML=info1
    }).catch(err=>console.log('Error:',err))
  }
 



  function currencyValue(){
    inputBox.forEach(item=>{
        if(item.classList.contains('currency-box-active')){
            let data1=item.innerHTML
        
        outputBox.forEach(item=>{
            if(item.classList.contains('currency-box-active')){
                let data2=item.innerHTML
            currencyGet(data1,data2)


        }
    }
    )}
    })}
    currencyValue()
    
    function currencyValue1(){
        outputBox.forEach(item=>{
            if(item.classList.contains('currency-box-active')){
                let data2=item.innerHTML
            
            inputBox.forEach(item=>{
                if(item.classList.contains('currency-box-active')){
                    let data1=item.innerHTML
                currencyGet1(data2,data1)
    
            }
        }
        )}
        })}

    
        
 
    
    
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
              currencyValue1()   
          });
        });

        function inputNumber(num) {
            num.addEventListener("input", function(){
              this.value = this.value.replace(/[^0-9.,]/g, "");
              this.value = this.value.replace(',','.')
              if(this.value[0] === '.'){
                this.value=this.value.replace(/[^0-9]/g, "")
              }
              if(this.value.split(".").length -1 > 1){
                this.value = this.value.slice(0, -1);
              }
            });
            }

        inputValue.addEventListener('keyup',()=>{
            console.log(inputValue.value)
            inputNumber(inputValue)
            currencyValue()
        })
        

        outputValue.addEventListener('keyup',()=>{
            console.log(outputValue.value)
            inputNumber(outputValue)
            currencyValue1()
        })
        console.log('abc:',abc)
        