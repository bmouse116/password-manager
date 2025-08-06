export interface PasswordOptions {
    length?: number;
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean
}

const DEFAULT_LENGTH = 16

const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
}

export function generatedPassword({
    length = DEFAULT_LENGTH,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
}: PasswordOptions): string {
    const selectedSets = Object.entries({
        uppercase,
        lowercase,
        numbers,
        symbols,
    }).filter(([, enabled]) => enabled).map(([key]) => CHAR_SETS[key as keyof typeof CHAR_SETS]);
    if(selectedSets.length === 0) return ''

    const garantiesChar = selectedSets.map(set => getRandomChar(set));
    const remainingLength = length - garantiesChar.length
    const allChars = selectedSets.join('')
    const passwordChars = [...garantiesChar]

    for(let i = 0; i < remainingLength; i++) {
        passwordChars.push(getRandomChar(allChars))
    }

    return shuffleArray(passwordChars).join('');
}

function getRandomChar(charset: string): string {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    const index = array[0] % charset.length
    return charset.charAt(index)
}

function shuffleArray(array: string[]): string[] {
    for(let i = array.length - 1; i > 0; i--) {
        const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}