// filter method in js
// filter () calls provided callback funtion 
// once ecach elment in the array
// and constrac new array  of the all value which is 
// return callback function true
// let arr = [
//     { id: 15 },
//     { id: -1 },
//     { id: 0 },
//     { id: 3 },
//     { id: 12.2 },
//     { },
//     { id: null },
//     { id: NaN },
//     { id: 'undefined' }
//   ]; 
//   let invalidenties = 0;
//   function filterByid (item) {
   
//      if(Number.isFinite(item.id) && item.id !== 0){
//          return true;
//      }
//      invalidenties++;
//      return false;

//   }
//   let enties = arr.filter(filterByid);
//   console.log(enties);

//     console.log(`invalidenties ${invalidenties}`)
//     let fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
//     function searchElement (element){
//     }
  
//   quick sort

function QuickSort(arr, start, end){
  let array = {...arr}
   if(start >= end) return;
 

   let index = patition(array,start,end);
   QuickSort(array, start , index-1);
   QuickSort(array , index + 1 , end)
   
}
 function patition(arr,start,end){
  let pivotValue = arr[end];
  let pivotIndex = start;
   for( let i=start; i<end ; i++){
    if(arr[i] < pivotValue){
      
       swap(arr, i , pivotIndex);
       pivotIndex++;

    }
    
   }
   return pivotIndex;
 }
  function swap(arr,a ,b){
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
     

  }

   let values = [23,56,786,876,4,42,1,3545,6]
  //  let endIndex= values.length() - 1;
   QuickSort(values, 0 , values.length - 1);
   console.log(QuickSort(values, 0 , values.length - 1))



