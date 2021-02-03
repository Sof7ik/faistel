const notCipheredElem = document.getElementById('notCiphered');
const cipheredElem = document.getElementById('ciphered');
const button = document.getElementById('do');

const cipher = string => {
    let key = [];
    let keyString = '';
    // Длина ключа.
    const keyLength = string.length;

    // Генерация ключа
    for (let i = 1; i < keyLength + 1; i++)
    {
        key.push(Math.floor(Math.random() * (keyLength - 1) + 1));
    }

    // смещение строки

    // Разбиваем строку на буквы.
    let stringArray = string.split('');

    // Смещаем каждую букву строки на число, соответсвтующее ей по индексу в ключе.
    let newMessage = stringArray.map( (item, itemIndex) => {
        item = String.fromCharCode(parseInt(item.charCodeAt(0)) + key[itemIndex]);
        return item;
    })

    // Смещенную строку превращаем в ASCII коды для превращения в биты.
    let newMessageASCIICodes = newMessage.map((item, index) => {
        return item.charCodeAt(0);
    })

    // Смещенную строку в ASCII кодах преращаем в биты
    const newMessageBits = newMessageASCIICodes.map((item, index) => {
        return item.toString(2);
    })

    console.log(newMessageBits);

    function getLength(arrayOfBits)
    {
        const commonLength = arrayOfBits.length;
        let charsLengths = arrayOfBits.map( (item, index) => {
            return item.length;
        } )

        return [charsLengths, commonLength];
    }

    const [charsLenthes, commonLength] = getLength(newMessageBits);

    let newMessageBitsString = newMessageBits.join('');

    console.log(`Длина битового сообщения = ${newMessageBitsString.length}, четность ${newMessageBitsString.length % 2}`);

    // Если длина битового представления нечетная, то добавляем вперед незначимый нулевой бит
    if (newMessageBitsString.length % 2 !== 0)
    {
        newMessageBitsString = '0' + newMessageBitsString.toString();
    }

    console.log('Битовая последовательность символов в ASCII кодах после добваления 0');
    console.log(newMessageBitsString);

    console.log(newMessageBitsString.length)

    let leftBlock = [], rightBlock = [];
    const newMessageBitsStringLength = newMessageBitsString.length;
    let newMessageBitsArray = newMessageBitsString.split('');
    newMessageBitsArray.forEach((item, index) => {
        if (index < newMessageBitsStringLength / 2)
        {
            leftBlock.push(item);
        }
        else if(index >= newMessageBitsStringLength / 2)
        {
            rightBlock.push(item);
        }
    })

    // console.log('Длина левого блока', leftBlock.length);
    // console.log('Левый блок', leftBlock);
    // console.log('____________________________________________');
    // console.log('Длина правого блока', rightBlock.length);
    // console.log('Правый блок', rightBlock);
    // console.log('____________________________________________');
    console.log('Длина обоих блоков вместе =', leftBlock.length + rightBlock.length);

    function someFoo(key, block) {
        console.log('block in someFoo', block);
        console.log('key in someFoo', key);

        console.log('Промежуточная функция');
        return parseInt(block) * parseInt(key);
    }

    console.log(leftBlock);

    const mediumOldLeftBlock = someFoo(parseInt(key.join('')), parseInt(leftBlock.join('')));
    console.log('Левый блок после промежуточной функции перед XOR с правым блоком', mediumOldLeftBlock.toString().split(''));

    // function XOR (block1, block2)
    // {
    //     let leftBlockAfterXOR = '';
    //     console.log('mediumOldLeftBlock in XOR foo', block1);
    //     console.log('rightBlock in XOR foo', block2);
    //
    //     for (let i = 0; i < block1.length + 1; i++)
    //     {
    //         leftBlockAfterXOR = leftBlockAfterXOR + (block1[i] ^ block2[i]);
    //     }
    //     return leftBlockAfterXOR;
    // }
    //
    // let leftBlockAfterXOR = XOR(mediumOldLeftBlock.toString().split(''), rightBlock);
    //
    // console.log('leftBlockAfterXOR = ', leftBlockAfterXOR);
    //
    // let newLeftBlock=[...leftBlockAfterXOR], newRightBlock = [...leftBlock];
    // console.log('')
    // console.log('----Новые блоки----');
    // console.log('Левый блок', newLeftBlock);
    // console.log('Правый блок', newRightBlock);
    //
    // const cipheredMessage = newLeftBlock.concat(newRightBlock);
    //
    // cipheredElem.value = cipheredMessage.join('');
}

button.addEventListener('click', e => cipher(notCipheredElem.value));
button.click();