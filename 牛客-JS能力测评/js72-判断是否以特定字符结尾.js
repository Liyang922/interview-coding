function endsWithVowel(str) {
    let regexp = /[aeiou]$/i;
    return regexp.test(str);
}
endsWithVowel("gorilla");