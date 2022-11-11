//Permutations
function permutations(s) {
    return is_null(s)
        ? list(null)
        : accumulate(append, null,
            map(x => map(p => pair(x,p),permutations(remove(x,s))),s));
        }