const arrMult         = (arrA, arrB) => arrA.map(a => arrB.map(b => [a, b] ) ).flat()
const arrDiff         = (arrA, arrB) => arrA.filter(a => !arrB.includes(a) )
const arrAdd          = (arrA, arrB) => arrA.concat( arrDiff(arrB, arrA) )
const arrIntersection = (arrA, arrB) => arrA.filter(a => arrB.includes(a) )

const arrDiffBoth_diff_add_inter = (arrA, arrB) => arrDiff(arrAdd(arrA, arrB), arrIntersection(arrA, arrB) )
const arrDiffBoth_add_diff_diff  = (arrA, arrB) => arrAdd(arrDiff(arrA, arrB), arrDiff(arrB, arrA) )



// export
module.exports = 
{
  arrMult,
  arrDiff,
  arrAdd,
  arrIntersection,
  arrDiffBoth_diff_add_inter,
  arrDiffBoth_add_diff_diff,
}