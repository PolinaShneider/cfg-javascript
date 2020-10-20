// function max(a, b) {
//     if (a > b) {
//         return a;
//     }
//
//     return b;
// }

// function break_func(a, b) {
//     for (let i = 0; i < b; i++) {
//         if (i % 2) {
//             break;
//         }
//     }
//
//     return a;
// }

// function continue_func(a, b) {
//     let sum = 0;
//     for (let i = 0; i < b; i++) {
//         if (i % 2) {
//             continue;
//         }
//
//         sum += i;
//     }
//
//     return sum;
// }

function ifElse(n) {
    let sum = 0;
    if (n > 0) {
        sum += 50;
    } else {
        sum -= 40;
    }

    return sum;
}

// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 const temp = arr[j + 1];
//                 arr[j + 1] = arr[j];
//                 arr[j] = temp;
//             }
//         }
//     }
//
//     return arr;
// }

// function dfs(tree) {
//     const stack = [tree];
//     const values = [];
//     while (stack.length) {
//         const curr = stack.pop();
//         values.push(curr.val);
//
//         for (let i = 0; i < curr.children.length; i++) {
//             const child = curr.children[i];
//             stack.push(child);
//         }
//     }
//
//     return values;
// }
