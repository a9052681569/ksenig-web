import { FieldValues, useController } from 'react-hook-form';
import './Input.scss';
import { InputProps } from './Input.types';

export const Input = <T extends FieldValues>({ type, placeholder, disabled, ...props }: InputProps<T>): JSX.Element => {
	const {
		field,
		fieldState: { invalid, error }
	} = useController<T>({
		...props
	});

	return (
		<div className="formfield">
			<input
				{...field}
				placeholder={placeholder}
				disabled={disabled}
				className={`input ${invalid && 'input--invalid'}`}
				type={type}
			/>
			{error && <div className="formfield__subscript">{error.message}</div>}
		</div>
	);
};
