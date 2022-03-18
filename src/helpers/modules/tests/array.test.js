
const { 
  arrMult,
  arrDiff,
  arrAdd,
  arrIntersection,
  arrDiffBoth_diff_add_inter,
  arrDiffBoth_add_diff_diff,
} = require('../arrays')





// describe('Test of arrMult()', () => {
//   test('multiplication of not empty arrays', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = ['soup', 'salad', 'steak']
  
//     const product = arrMult(arr1, arr2)
//     console.log(product)  

//     expect(product.length).toBe((arr1.length * arr2.length) ) 

//     product.forEach(item => { 
//       expect(arr1).toEqual(expect.arrayContaining([item[0] ]) )
//       expect(arr2).toEqual(expect.arrayContaining([item[1] ]) )
//     })
    
//   })

//   test('!empty times empty', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = []
  
//     const product = arrMult(arr1, arr2)
//     console.log(product)

//     expect(product.length).toBe((arr1.length * arr2.length) ) // obvious
    
//     // (*) simply [] doesn't launch loop, so any statement inside is always correct statement,
//     //  in particular the origin statement
//     product.forEach(item => { // (*)
//       expect(arr1).toEqual(expect.arrayContaining([item[0] ]) )
//       expect(arr2).toEqual(expect.arrayContaining([item[1] ]) )
//     })
    
//   }) 

//   test('empty times !empty', () => {
//     const arr1 = []
//     const arr2 = ['apple', 'banana', 'grape', 'carrot']
  
//     const product = arrMult(arr1, arr2)
//     console.log(product)

//     expect(product.length).toBe((arr1.length * arr2.length) )
//     expect(product.length).toBe(0)

//     product.forEach(item => {
//       expect(arr1).toEqual(expect.arrayContaining([item[0] ]) )
//       expect(arr2).toEqual(expect.arrayContaining([item[1] ]) )
//     })
//   }) 
// })



// describe('Test of arrSubtruct() ', () => {
//   test('Are there product items in original arrays and whether the order is correct', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = ['apple', 'banana', 'steak']
  
//     const product = arrDiff(arr1, arr2)
//     console.log(product)

//     expect(product).not.toEqual(expect.arrayContaining(arr2) )
//     expect(arr1).toEqual(expect.arrayContaining(product) )
//   })

//   test('!empty subtracts empty', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = []
  
//     const product = arrDiff(arr1, arr2)
//     console.log(product)

//     expect(product).toEqual(expect.arrayContaining(arr2) ) // anyArr.includes([])
//     expect(arr1).toEqual(expect.arrayContaining(product) )
//     expect(product.length).toBe(arr1.length)
//   }) 

//   test('empty subtracts !empty', () => {
//     const arr1 = []
//     const arr2 = ['apple', 'banana', 'grape', 'carrot']
  
//     const product = arrDiff(arr1, arr2)
//     console.log(product)

//     expect(product.length).toBe(0)
//   }) 

// })


// describe('Test of arrAdd() ', () => {

//   test('Are there product items in original arrays and whether the order is correct', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = ['apple', 'banana', 'steak']
  
//     const product = arrAdd(arr1, arr2)
//     console.log(product)

//     expect(product).toEqual(expect.arrayContaining(arr2) )
//     expect(product).toEqual(expect.arrayContaining(arr1) )
//   })

//   test('!empty adds empty', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = []
  
//     const product = arrAdd(arr1, arr2)
//     console.log(product)

//     expect(product).toEqual(expect.arrayContaining(arr1) )
//     expect(product.length).toBe(arr1.length)
//   })

//   test('empty adds !empty', () => {
//     const arr1 = []
//     const arr2 = ['apple', 'banana', 'grape', 'carrot']
  
//     const product = arrAdd(arr2, arr1)
//     console.log(product)

//     expect(product).toEqual(expect.arrayContaining(arr2) )
//     expect(product.length).toBe(arr2.length)
//   })
// })



// describe('Test of arrIntersection() ', () => {
  
//   test('Are there product items in original arrays and whether the order is correct', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = ['apple', 'banana', 'steak']
  
//     const product = arrIntersection(arr1, arr2)
//     console.log(product)
//     expect(
//       expect(arr1).toEqual(expect.arrayContaining(product) ) 
//       &&
//       expect(arr2).toEqual(expect.arrayContaining(product) )
//     )
//   })

//   test('!empty intersects empty', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = []
  
//     const product = arrIntersection(arr1, arr2)
//     console.log(product)

//     expect(product.length).toBe(0)
//   })

//   test('empty intersects !empty', () => {
//     const arr1 = []
//     const arr2 = ['apple', 'banana', 'grape', 'carrot']
  
//     const product = arrIntersection(arr2, arr1)
//     console.log(product)

//     expect(product.length).toBe(0)
//   })
// })



// describe('Test of arrDiffBoth_diff_add_inter() ', () => {
  
//   test('Are there product items in original arrays and whether the order is correct', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = ['apple', 'banana', 'steak']
  
//     const product = arrDiffBoth_diff_add_inter(arr1, arr2)
//     console.log(product)

//     expect(
//       expect(arr1).not.toEqual(expect.arrayContaining(product) ) 
//       ||
//       expect(arr2).not.toEqual(expect.arrayContaining(product) )
//     )
//   })

//   test('!empty diffBoths empty', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = []
  
//     const product = arrDiffBoth_diff_add_inter(arr1, arr2)
//     console.log(product)

//     expect(product.length).toBe(arr1.length)
//   })

//   test('empty diffBoths !empty', () => {
//     const arr1 = []
//     const arr2 = ['apple', 'banana', 'grape', 'carrot']
  
//     const product = arrDiffBoth_diff_add_inter(arr2, arr1)
//     console.log(product)

//     expect(product.length).toBe(arr2.length)
//   })
// })



// describe('Test of arrDiffBoth_add_diff_diff() ', () => {
  
//   test('Are there product items in original arrays and whether the order is correct', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = ['apple', 'banana', 'steak']
  
//     const product = arrDiffBoth_add_diff_diff(arr1, arr2)
//     console.log(product)
    
//     expect(
//       expect(arr1).not.toEqual(expect.arrayContaining(product) ) 
//       ||
//       expect(arr2).not.toEqual(expect.arrayContaining(product) )
//     )
//   })

  
//   test('!empty diffBoths empty', () => {
//     const arr1 = ['apple', 'banana', 'grape', 'carrot']
//     const arr2 = []
  
//     const product = arrDiffBoth_add_diff_diff(arr1, arr2)
//     console.log(product)

//     expect(product.length).toBe(arr1.length)
//   })

//   test('empty diffBoths !empty', () => {
//     const arr1 = []
//     const arr2 = ['apple', 'banana', 'grape', 'carrot']
  
//     const product = arrDiffBoth_add_diff_diff(arr2, arr1)
//     console.log(product)

//     expect(product.length).toBe(arr2.length)
//   })
// })
