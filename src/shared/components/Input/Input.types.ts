import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
	placeholder?: string;
	disabled?: boolean;
	type?: HTMLInputTypeAttribute;
}
