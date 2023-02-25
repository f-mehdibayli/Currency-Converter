const inputBox = document.querySelectorAll('.input-boxes .currency-box');
const outputBox = document.querySelectorAll('.output-boxes .currency-box');

const inputValue=document.querySelector('.input-value input')
const outputValue=document.querySelector('.output-value input')

const infoValue=document.querySelector('.input-value .currency-value')
const infoValue2=document.querySelector('.output-value .currency-value')


const dataValue=async (input,output)=>{
    try {
        const response=await fetch(`https://api.exchangerate.host/latest?base=${input}&symbols=${output}`)
        const data=await response.json();
        return data
            
    } catch (error) {
        alert('Internetle əlaqədar problem cixdi')
        
    }
    
}

function formatNum(num){
    const strNum=num.toString();
    const parts=strNum.split('.')
    if(parts.length === 1){
        return num
    }else if(parts[1].length <=4 ){
        return num
    }else{
        return parseFloat(num.toFixed(4))
    }
}


const currencyGet=(input,output)=>{
    dataValue(input,output).then(data=> {
       
        const baseCurrency=input
        const targetCurrency=output 
        const resultValue=data.rates[targetCurrency]
        if(inputValue.value ===''){
            outputValue.value=''
        }else{
            const end=inputValue.value*resultValue
            const endNumber=formatNum(end)
            outputValue.value=endNumber
        }
        const info=`1 ${baseCurrency} = ${resultValue} ${targetCurrency}`
        infoValue.innerHTML=info
        
    }).catch(err=>console.log('Error:',err))


    dataValue(output,input).then(data=> {
        const baseCurrency=output
        const targetCurrency=input 
        const resultValue=data.rates[targetCurrency]
        const info1=`1 ${baseCurrency} = ${resultValue} ${targetCurrency}`
        infoValue2.innerHTML=info1
       
    }).catch(err=>console.log('Error:',err))
  }



  const currencyGet1=async(input,output)=>{
    dataValue(input,output).then(data=> {

        const baseCurrency=input
        const targetCurrency=output
        const resultValue=data.rates[targetCurrency]
        if(outputValue.value ===''){
            inputValue.value=''
        }else{ 
            const end=outputValue.value*resultValue
            console.log(end)
            const endNumber=formatNum(end)
            inputValue.value=endNumber
         }
       
        const info=`1 ${baseCurrency} = ${resultValue} ${targetCurrency}`
        infoValue2.innerHTML=info

        dataValue(output,input).then(data=> {
            const baseCurrency=output
            const targetCurrency=input 
            const resultValue=data.rates[targetCurrency]
            const info1=`1 ${baseCurrency} = ${resultValue} ${targetCurrency}`
            infoValue.innerHTML=info1
           
        }).catch(err=>console.log('Error:',err))
         
        
    }).catch(err=>console.log('Error:',err))
  }
 



  function currencyValue(){
    inputBox.forEach(item=>{
        if(item.classList.contains('currency-box-active')){
            let data1=item.innerHTML
        
        outputBox.forEach(item=>{
            if(item.classList.contains('currency-box-active')){
                let data2=item.innerHTML
                if(data1===data2){
                    outputValue.value=inputValue.value
                    infoValue.innerHTML=`1 ${data1} = 1 ${data2}`
                    infoValue2.innerHTML=`1 ${data1} = 1 ${data2}`
                }else{
                    currencyGet(data1,data2)
                }
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
                    if(data2===data1){
                        inputValue.value=outputValue.value
                        infoValue2.innerHTML=`1 ${data2} = 1 ${data1}`
                        infoValue.innerHTML=`1 ${data2} = 1 ${data1}`
                    }else{
                        currencyGet1(data2,data1)
                    }
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
              currencyValue()   
          });
        });

        function inputNumber(num) {
            num.addEventListener("input", function(){
              this.value = this.value.replace(/[^0-9.,]/g, "");
              this.value = this.value.replace(',','.')
              if(this.value[0] === '.'){
                this.value=this.value.replace(/[^0-9]/g, "")
              }
              if(this.value.split(".").length - 1 > 1){
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
       
        


    
   