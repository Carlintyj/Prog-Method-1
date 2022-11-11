//Searching (list)
function linear_search(x, xs) {
    const len = length(xs);
    for (let i = 0; i < len; i = i + 1) {
        if (head(xs) === x) {
            return true;
        } else {
            xs = tail(xs);
        }
    }
    return false;
}

//Sorting (list)
function insertion_sort(xs) {                   //insertion sort
    function insert(x, xs) {
        return is_null(xs)
               ? list(x)
               : x <= head(xs)
               ? pair(x, xs)
               : pair(head(xs), insert(x, tail(xs)));
    }
    return is_null(xs) 
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}

function selection_sort(xs) {                   //selection sort
    function smallest(xs) {
        return accumulate((x, y) => x < y ? x : y, 
                          head(xs), tail(xs));
    }
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}


function merge_sort(xs) {                       //merge sort
    function middle(n) {
        return math_floor(n / 2);
    }
    function take(xs, n) {
        return n === 0
            ? null
            : pair(head(xs), take(tail(xs),n-1));
    }
    function drop(xs, n) {
        return n === 0
            ? xs
            : drop(tail(xs),n-1);
    }
    function merge(xs, ys) {
        if (is_null(xs)) {
            return ys;
        } else if (is_null(ys)) {
            return xs;
        } else {
            const x = head(xs);
            const y = head(ys);
            return x < y
                   ? pair(x, merge(tail(xs), ys))
                   : pair(y, merge(xs, tail(ys)));
        }
    }
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)),
                     merge_sort(drop(xs, mid)));
    }
}


function quicksort(xs) {                        //quicksort
    function partition(xs, p) {
        return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
    }
    if (is_null(xs)) {
        return null;
    } else {
        const pivot = head(xs);
        const partition_list = partition(tail(xs), pivot);
        return append(append(
                    quicksort(head(partition_list)), list(pivot)), 
                        quicksort(tail(partition_list)));
    }
}
