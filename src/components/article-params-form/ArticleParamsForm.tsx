import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type Props = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);
	const handeFormChange = <K extends keyof ArticleStateType>(
		key: K,
		selected: ArticleStateType[K]
	) => {
		setFormState((prev) => ({
			...prev,
			[key]: selected,
		}));
	};
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onReset={(e) => {
						e.preventDefault();
						onReset();
					}}
					onSubmit={(e) => {
						e.preventDefault();
						onApply(formState);
					}}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/*инпуты и селекты*/}
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected) =>
							handeFormChange('fontFamilyOption', selected)
						}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) => handeFormChange('fontSizeOption', selected)}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected) => handeFormChange('fontColor', selected)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected) =>
							handeFormChange('backgroundColor', selected)
						}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) => handeFormChange('contentWidth', selected)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
