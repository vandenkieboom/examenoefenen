export function isFiveLetterWord(word: string): boolean {
    if (word.length === 5) {
        return true
    } else {
        return false
    }
}

export function getFiveLetterWords(arr: string[]): string[] {
    const newArr = [...arr].filter(word => {
        return isFiveLetterWord(word)
    })

    return newArr;
}

export function toUpperCase(arr: string[]): string[] {
    return arr.map(word => word.toUpperCase());
}

export function getRandomWord(arr: string[]): string {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}




