import { useRef, useState } from 'react';

enum Operators {
    add, subtract, multiply, divide
}

export default function useCalculator() {
    const [lastNumber, setLastNumber] = useState('0');
    const [number, setNumber] = useState('0');

    const lastOperation = useRef<Operators>()

    const clean = () => {
        setLastNumber('0');
        setNumber('0');
    }

    const popNumber = ( textNumber: string ) => {
        if( number.includes('.') && textNumber === '.' ) return;

        if( number.startsWith('0') || number.startsWith('-0') ) {

            if( textNumber === '.') {
                setNumber( number + textNumber );
            } else if( textNumber === '0' && number.includes('.') ) {
                setNumber( number + textNumber );
            } else if ( textNumber !== '0' && !number.includes('.') ) {
                setNumber( textNumber );
            } else if ( textNumber === '0' && !number.includes('.') ) {
                setNumber( number );
            } else {
                setNumber( number + textNumber );
            }

        } else {
            setNumber( number + textNumber );
        }
    }

    const positiveNegative = () => {
        if( number.includes('-') ){
            setNumber( number.replace('-', '') );
        } else {
            setNumber( ('-' + number) );
        }
    }

    const btnDel = () => {
        let negative = '';
        let numberTemp = number;
        if( number.includes('-') ) {
            negative = '-';
            numberTemp = number.substring(1);
        }
        if( numberTemp.length > 1 ) {
            setNumber( negative + numberTemp.slice(0,-1) )
        } else {
            setNumber('0');
        }
    }

    const setPreviousNumber = () => {
        if( number.endsWith('.') ) {
            setLastNumber( number.slice(0,-1) );
        } else {
            setLastNumber( number );
        }
        setNumber('0');
    }

    const btnDivide = () => {
        setPreviousNumber();
        lastOperation.current = Operators.divide;
    }

    const btnMultiply = () => {
        setPreviousNumber();
        lastOperation.current = Operators.multiply;
    }

    const btnSubtract = () => {
        setPreviousNumber();
        lastOperation.current = Operators.subtract;
    }

    const btnAdd = () => {
        setPreviousNumber();
        lastOperation.current = Operators.add;
    }

    const calculate = () => {
        const num1 = Number( number );
        const num2 = Number( lastNumber );

        switch ( lastOperation.current ) {
            case Operators.add:
                setNumber( `${ num1 + num2 }` );
                break;
            case Operators.subtract:
                setNumber( `${ num2 - num1 }` );
                break;
            case Operators.multiply:
                setNumber( `${ num1 * num2 }` );
                break;
            case Operators.divide:
                setNumber( `${ num2 / num1 }` );
                break;
        }

        setLastNumber( '0' );
    }

    return {
        lastNumber,
        number,
        clean,
        positiveNegative,
        btnDel,
        btnDivide,
        popNumber,
        btnMultiply,
        btnSubtract,
        btnAdd,
        calculate
    }
}